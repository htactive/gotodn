using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN
{
    public class ImageHelper
    {
        private static ImageCodecInfo jpegCodecInfo = null;
        private static ImageCodecInfo JPEGCodecInfo
        {
            get
            {
                if (jpegCodecInfo == null)
                {
                    jpegCodecInfo = ImageCodecInfo.GetImageEncoders().ToList().Find(delegate (ImageCodecInfo codec) { return codec.FormatID == ImageFormat.Jpeg.Guid; });
                }
                return jpegCodecInfo;
            }
        }
        public static Stream CompressImage(Stream sourceStream, long quality)
        {
            Stream outStream = new MemoryStream();

            EncoderParameters parameters = new EncoderParameters(1);

            parameters.Param[0] = new EncoderParameter(Encoder.Quality, quality);
            using (var sourceImage = Image.FromStream(sourceStream))
            {
                sourceImage.Save(outStream, JPEGCodecInfo, parameters);
            }
            Stream returnStream = new MemoryStream();
            returnStream = ScaleImageStream(outStream, 960, 640);
            return returnStream;
        }
        public static Stream ScaleIcon(Stream iconStream, int maxWidth, int maxHeight)
        {
            Stream returnStream = new MemoryStream();
            using (var image = Image.FromStream(iconStream))
            {
                var ratioX = (double)maxWidth / image.Width;
                var ratioY = (double)maxHeight / image.Height;
                if (ratioX > 1 && ratioY > 1) return iconStream;
                var ratio = Math.Min(ratioX, ratioY);
                var newWidth = (int)(image.Width * ratio);
                var newHeight = (int)(image.Height * ratio);

                var newImage = new Bitmap(newWidth, newHeight);

                using (var graphics = Graphics.FromImage(newImage))
                    graphics.DrawImage(image, 0, 0, newWidth, newHeight);

                newImage.Save(returnStream, ImageFormat.Png);
            }

            return returnStream;
        }

        private static Stream ScaleImageStream(Stream imageStream, int maxWidth, int maxHeight)
        {
            Stream returnStream = new MemoryStream();
            using (var image = Image.FromStream(imageStream))
            {
                var ratioX = (double)maxWidth / image.Width;
                var ratioY = (double)maxHeight / image.Height;
                if (ratioX > 1 && ratioY > 1) return imageStream;
                var ratio = Math.Min(ratioX, ratioY);
                var newWidth = (int)(image.Width * ratio);
                var newHeight = (int)(image.Height * ratio);

                var newImage = new Bitmap(newWidth, newHeight);

                using (var graphics = Graphics.FromImage(newImage))
                    graphics.DrawImage(image, 0, 0, newWidth, newHeight);

                newImage.Save(returnStream, ImageFormat.Jpeg);
            }

            return returnStream;
        }
    }
}
