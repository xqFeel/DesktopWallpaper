/*
 * @Author: “龚建勋” 985790484@qq.com
 * @Date: 2022-05-13 11:13:41
 * @LastEditors: “龚建勋” 985790484@qq.com
 * @LastEditTime: 2022-05-13 13:55:42
 * @FilePath: /壁纸图片/uploadFileName.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require("fs");
const path = require("path");

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "WEBP"];

fs.readdir(process.cwd(), (err, files) => {
  const filesData = files.filter((f) => {
    const len = f.split(".");
    const suffix = len[len.length - 1];
    const suffixCase = suffix.toLocaleUpperCase();
    return fileTypes.includes(suffixCase);
  });
  filesData.forEach((item, ind) => {
    let index = ind + 1;
    const len = item.split(".");
    const suffix = len[len.length - 1];
    fs.rename(
        path.join(process.cwd(), item),
        path.join(process.cwd(), `${plusNum(index)}.${suffix}`),
        (err) => {
          if (err) throw err;
        }
      );
  });
});

const plusNum = (num) => {
  switch (true) {
    case num < 10:
      return `000${num}`;
      break;
    case num >= 10 && num < 100:
      return `00${num}`;
      break;
    case num >= 100 && num < 1000:
      return `0${num}`;
      break;
    case num >= 1000:
      return `${num}`;
      break;
    default:
      return `${num}-${getTime()}`;
      break;
  }
};

const getTime = () => {
  const myDate = new Date();
  const YYYY = myDate.getFullYear(); //获取年
  const MM = myDate.getMonth() + 1; //获取月，默认从0开始，所以要加一
  const DD = myDate.getDate(); //获取日
  const hh = myDate.getHours(); //获取小时
  const mm = myDate.getMinutes(); //获取分
  const ss = myDate.getSeconds(); //获取秒
  return `${YYYY}-${MM < 10 ? "0" + MM : MM}-${DD < 10 ? "0" + DD : DD}~${
    hh < 10 ? "0" + hh : hh
  }:${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
};
