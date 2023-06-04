## Description

Video Application 

• Supabase Storage Setup: Set up a Supabase project and configure a storage bucket for video files. Ensure that your bucket allows for sufficient file sizes to accommodate video content.

• Video Upload API: Create an API endpoint that allows users to upload a video file. The API should convert all uploads to a standard MP4 video format. Use a multipart form data upload. This video should then be stored in the Supabase storage bucket you configured.

• Video Merging API: Implement an API endpoint that accepts two video IDs. This endpoint should trigger a video processing function that fetches the two corresponding videos from Supabase storage and merges them into one video using FFmpeg. Consider the following:
Extract a 30-second clip from each video:
Merge both videos in sequential order (i.e. the second video follows the first)
Add a watermark to the merged video. 
The watermark should be a static image that you can generate. It should appear in the bottom right corner of the video.
The output video should have the same format as the input videos
The output video should be uploaded back to Supabase storage in a designated "merged" folder within your bucket


• Video Metadata API: Create a new API endpoint that accepts a video ID and returns the metadata of the video. The Metadata returned should include the duration, the format, the codec, the resolution, the bitrate, and the frame rate. You'll need to use the ffprobe tool from the FFmpeg suite to extract this information.

• Download API: The merged video should then be accessible to the user via a download link, provided through another API endpoint.

• Dockerization: Dockerize the application ensuring all dependencies (like FFmpeg) are included in the Docker image. Write a Dockerfile that can be used to build a Docker image of the service.

## Installation

```bash
$ npm install
```

## Running the app

Make sure you add value for `.env` in the same format as `.env.example` to run this application. 

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

Swagger Docs are available at
Dev Env -> http://localhost:3000/docs


## Deploying on Docker

docker build -t video-app .

docker run -dp 3000:3000 --name video-app video-app
