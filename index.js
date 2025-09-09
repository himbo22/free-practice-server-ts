const express = require("express");
const app = express();
const port = 3036;

app.get("/", (req, res) => {
  res.send("Hello Minju, I love you");
});

app.get("/age/:day/:month/:year", (req, res) => {
  const { day, month, year } = req.params;

  const birthDate = new Date(`${year}-${month}-${day}`);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    return res.status(400).send("Ngày tháng năm không hợp lệ");
  }

  // Tính số năm và số tháng chính xác
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths -= 1;
    const prevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    ageDays += prevMonth;
  }

  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }

  // Chuyển tháng sang phần thập phân
  const decimalAge = (ageYears + ageMonths / 12 + ageDays / 365).toFixed(1);

  res.json({
    birthDate: `${day}/${month}/${year}`,
    age: decimalAge,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
