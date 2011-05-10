size="ntsc"
rate=".2"

if [ $# -eq 0 ]
then
  echo "Usage: $0 <filename> [rate] [size]"
  exit $E_NO_ARGS
fi

if [ $# -gt 1 ]
then
	echo "Setting rate=$2"
	rate=$2
fi

if [ $# -gt 2 ]
then
	echo "Setting size=$3"
	size=$3
fi


mkdir -p output
rm -rf output/*

cp gui/* output/
cp gui/.htaccess output/

mkdir -p output/images


ffmpeg -threads 2 -i $1 -f webm -s $size output/video.webm
ffmpeg -i $1 -r $rate -s $size -f image2 output/images/%02d.jpg


echo "image_list = Array();" > output/image_list.js
echo "image_rate = 1 / $rate" >> output/image_list.js
for i in `ls output/images`; do
	echo "image_list.push('$i'); " >> output/image_list.js
done
