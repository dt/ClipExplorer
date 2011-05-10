mkdir -p output
rm -rf output/*

cp gui/* output/

mkdir -p output/images

size="ntsc"
rate=".2"

ffmpeg -threads 2 -i $1 -f webm -s $size output/video.webm
ffmpeg -i $1 -r $rate -s $size -f image2 output/images/%02d.jpg


echo "image_list = Array();" > output/image_list.js
echo "image_rate = 1 / $rate" >> output/image_list.js
for i in `ls output/images`; do
	echo "image_list.push('$i'); " >> output/image_list.js
done
