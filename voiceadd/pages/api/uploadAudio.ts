import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files } from 'formidable';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextApiRequest) =>
    new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
        const uploadDir = path.join(process.cwd(), 'temp_uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const form = new IncomingForm({
            uploadDir,
            keepExtensions: true,
        });
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });

interface TranscriptionResponse {
  text: string;
  segments?: {
    start: number;
    end: number;
    text: string;
  }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fields, files } = await parseForm(req);

    // apiKeyがstringかstring[]かをチェックし、文字列を取得
    const apiKey = Array.isArray(fields.apiKey) ? fields.apiKey[0] : fields.apiKey;

    // audioファイルを取得
    const audioFile = Array.isArray(files.audio) ? files.audio[0] : files.audio;

    console.log('Received audio file:', audioFile);

    if (!apiKey || typeof apiKey !== 'string') {
      res.status(400).json({ error: '必要なパラメータが不足しています。' });
      return;
    }

    if (!audioFile || !audioFile.filepath) {
      res.status(400).json({ error: '音声ファイルがアップロードされていません。' });
      return;
    }

    // 保存先ディレクトリを指定
    const audioDir = path.join(process.cwd(), 'transcribed_audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    // 拡張子を取得してファイルパスに追加
    const originalFilename = Array.isArray(audioFile.originalFilename)
      ? audioFile.originalFilename[0]
      : audioFile.originalFilename || 'audio';
    const fileExt = path.extname(originalFilename) || '.webm';
    const baseFilename = path.basename(originalFilename, fileExt);
    const filePathWithExt = path.join(audioDir, `${baseFilename}${fileExt}`);

    // ファイルをリネームして拡張子を追加
    fs.renameSync(audioFile.filepath, filePathWithExt);

    const openai = new OpenAI({ apiKey });

    const transcription: TranscriptionResponse = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePathWithExt),
      model: 'whisper-1',
      language: 'ja',
      response_format: 'verbose_json', // 詳細なJSON形式で取得
    });

    // セグメントが存在するか確認
    if (!transcription.segments) {
      throw new Error('Transcription segments not found.');
    }

    // セグメントをフォーマット
    const formattedTranscription = transcription.segments
      .map(segment => {
        const start = new Date(segment.start * 1000).toISOString().substr(11, 12);
        const end = new Date(segment.end * 1000).toISOString().substr(11, 12);
        return `[${start} ===> ${end}] ${segment.text}`;
      })
      .join('\n');

    // テキストファイルとして保存
    const transcriptPath = path.join(audioDir, `${baseFilename}.txt`);
    fs.writeFileSync(transcriptPath, formattedTranscription, 'utf8');

    res.status(200).json({ transcript: transcription.text, transcriptPath });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || '内部サーバーエラーが発生しました。' });
  }
}