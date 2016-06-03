 export default (time) => {
     time = Date.now() - time;
     time = Math.round(time / 1000); // rounds to nearest second
     var seconds = time % 60;
     var times = [];
     if (seconds) times.push(String(seconds) + '秒前');
     var minutes, hours, days;
     if (time >= 60) {
         time = (time - seconds) / 60; // converts to minutes
         minutes = time % 60;
         if (minutes) times = [String(minutes) + '分钟前'].concat(times);
         if (time >= 60) {
             time = (time - minutes) / 60; // converts to hours
             hours = time % 24;
             if (hours) times = [String(hours) + '小时前'].concat(times);
             if (time >= 24) {
                 days = (time - hours) / 24; // you can probably guess this one
                 if (days) times = [String(days) + '天前'].concat(times);
             }
         }
     }
     if (!times.length) times.push('刚刚');
     return times[0];
 }
