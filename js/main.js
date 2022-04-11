const hourArrow = document.querySelector('.clock__hour');
const minuteArrow = document.querySelector('.clock__minute');
const secondArrow = document.querySelector('.clock__second_one');
const secondArrowGhost = document.querySelector('.clock__second_two');
const dataTime = document.querySelector('.clock__panel_time');
const dataDey = document.querySelector('.clock__panel_day');

var ghost = 0, second = 0, minute = 0, hour = 0, day = 0, month = 0, isHidden = 0;

var MonthsArray = ['января','февр.','марта','апр.',
                   'мая','июня','июля','авг.',
                   'сент.','окт.','ноября','дек.'];


function clock() {
   // установка значений часов при загрузке
   setArrowTime();
   arrowSecondGhost();
   arrowStyle(1);

   // основная функция
   setInterval(() => {
      // если вкладка не активна
      if(document.hidden){
         if(isHidden === 0){
            arrowStyle(0);
            isHidden = 1;
         }
      } else{
         // установка секундной стрелки
         arrowSecondGhost();
         // обновление стрелок и даты
         if((second > 58)||(second < 2)){setArrowTime()}
         if(isHidden === 1){
            setArrowTime();
            arrowStyle(1);
            isHidden = 0;
         }
      }
   }, 100);
}
clock();


function setArrowTime(){
   const data = new Date();

   minute = data.getMinutes();
   hour = data.getHours();
   day = data.getDate();
   month = data.getMonth();

   hourArrow.style.transform = 'rotateZ(' + ((hour * 30) + (minute / 2)) + 'deg)';
   minuteArrow.style.transform = 'rotateZ(' + (minute * 6) + 'deg)';

   if (hour < 10){hour = '0' + hour}
   if (minute < 10){minute = '0' + minute}
   if (day < 10){day = '0' + day}

   dataTime.innerHTML = hour + ':' + minute;
   dataDey.innerHTML = day + ' ' + MonthsArray[month];
}


function arrowSecondGhost(){
   const data = new Date();
   second = data.getSeconds();

   if((second>=0)&(second<30)){
      ghost = 30 + second;
   } else {
      ghost = second - 30;
   }

   if((second>15)&(second<45)){
      secondArrow.style.opacity = '1';
      secondArrowGhost.style.opacity = '0';
   } else {
      secondArrow.style.opacity = '0';
      secondArrowGhost.style.opacity = '1';
   }

   secondArrow.style.transform = 'rotateZ(' + (second * 6 + 6) + 'deg)';
   secondArrowGhost.style.transform = 'rotateZ(' + (ghost * 6 + 6) + 'deg)';
}


function arrowStyle(a){
   // костыль для работы на неактивной вкладке
   // задержка 20ms ОЧЕНЬ нужна для выхода из неактива
   setTimeout(()=>{
      secondArrow.style.transition = 'transform ' + a + 's linear';
      secondArrowGhost.style.transition = 'transform ' + a + 's linear';
   }, 20);
}



// смена темного и светлого стилей
const darkLight = document.querySelector('.bottom');
const clockBg = document.querySelector('.clock');

function reflash(){
   const isDark = clockBg.classList.contains('light');
   if (isDark) {
      clockBg.classList.remove('light');
   } else {
      clockBg.classList.add('light');
   };
}
darkLight.addEventListener('click', reflash);
