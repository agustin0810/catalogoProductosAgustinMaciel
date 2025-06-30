import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const uploadToS3 = async (file) => {
    const REGION = import.meta.env.VITE_S3_REGION;
    const BUCKET = import.meta.env.VITE_S3_BUCKET_NAME;
    const ACCESS_KEY = import.meta.env.VITE_S3_ACCESS_KEY;
    const SECRET_KEY = import.meta.env.VITE_S3_SECRET_ACCESS_KEY;

    const s3 = new S3Client({
        region: REGION,
        credentials: {
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_KEY,
        },
    });

    const fileName = `products/${Date.now()}_${file.name}`;
    console.log(fileName)
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: fileName,
        Body: new Uint8Array(await file.arrayBuffer()),
        ContentType: file.type,
        
    });

    await s3.send(command);

    return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
};
