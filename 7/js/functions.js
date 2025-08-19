// const stringLengthCheck = function (string, maxLength) {
//   return string.length <= maxLength;
// };

// const palindromeCheck = function (string) {
//   const str = string.toString().toLowerCase().replaceAll(' ', '');
//   let reversedString = '';

//   for (let i = str.length - 1; i >= 0; i--) {
//     reversedString += str[i];
//   }

//   return str === reversedString;
// };

// const getIntegers = function (string) {
//   let result = '';
//   const str = string.toString();

//   for (let i = 0; i < str.length; i++) {
//     if (!isNaN(parseInt(str[i], 10))) {
//       result += str[i];
//     }
//   }

//   return result ? parseInt(result, 10) : NaN;
// };
const toMinutes = (timeArray) => {
  const [hours, minutes] = timeArray.map(Number);
  return hours * 60 + minutes;
};

const isInWorkHours = (start, end, meet, dur) => {
  const [startMins, endMins, meetMins] = [start, end, meet].map((time) =>
    toMinutes(time.split(':')),
  );
  return meetMins >= startMins && meetMins + dur <= endMins;
};

window.console.log(isInWorkHours('08:00', '17:30', '14:00', 90));
