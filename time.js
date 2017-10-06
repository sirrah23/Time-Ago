const datetime = (function(){ 
    const MILLISECONDS_PER_HOUR = 3.6e6;
    const UTC_to_EST_MILLISECONDS = -(240 *60 * 1000);
  
    function dateString(date){
      return `${date.toDateString()} @ ${date.toTimeString().substring(0,8)}`
    }
  
    function timeComputer(hours){
      this.hours = hours;  
      this.timestampNow = Date.now();
    }
  
    timeComputer.prototype.nowDate = function(){
      return new Date(this.timestampNow + UTC_to_EST_MILLISECONDS);
    }  
  
    timeComputer.prototype.computedDate = function(){
      return new Date(this.timestampNow + UTC_to_EST_MILLISECONDS - (this.hours * MILLISECONDS_PER_HOUR));
    }
    
    return {
      timeComputerFactory: hours => new timeComputer(hours),
      dateString: dateString
    }
    
});

module.exports = datetime;