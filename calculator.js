function calculate(obj) {
  var connectedPower = obj.inputPower.value * 1; // Присоединяемая мощность
  var totalCost = 0;                             // Итоговая стоимость
  var connectedCost = 0;                         // Стоимость за присоединение
  var linesCost = 0;                             // Стоимость строительства линий
  var subStantionsCost = 0;                      // Стоимость строительства подстанций
  var L1 = 0;
  var L2 = 0;
  var L3 = 0;
  var L4 = 0;
  var L5 = 0;
  var L6 = 0;
  var L7 = 0;
  document.getElementById("resblock").style.display = "block";
  if ((document.getElementById("id5").checked) && (connectedPower<=15)) {
    totalCost = C0;
  }   // 550 рублей
  else {                            // все остальные варианты
    if (document.getElementById("needBuildLines").checked) {  // Протяжённости линий    
      L1 = obj.air04.value * 1 / 1000;
      L2 = obj.cable04.value * 1 / 1000;
      L3 = obj.cableGNB04.value * 1 / 1000;
      L4 = obj.airIsolated610.value * 1 / 1000;
      L5 = obj.airNotIsolated610.value * 1 / 1000;
      L6 = obj.cable610.value * 1 / 1000;
      L7 = obj.cableGNB610.value * 1 / 1000;
      // alert(L1+L2+L3+L4+L5+L6+L7);
    }
    if (document.getElementById("id1").checked) {  // Расчёт методом ставки платы за технологическое присоединение  
      connectedCost = connectedPower * NDS * power_C1;
      linesCost = connectedPower * NDS * (L1*power_C2_1_04 + L2*power_C3_1_04 + L3*power_C3_2_04 + L4*power_C2_1_610 + L5*power_C2_2_610 + L6*power_C3_1_610 + L7*power_C3_2_610);
      if (document.getElementById("id7").checked) {
        if (connectedPower <= 250) { subStantionsCost = power_C5_1_below250 };
        if ((connectedPower > 250) && (connectedPower <= 500)) { subStantionsCost = power_C5_1_250500 };
        if (connectedPower > 500) { subStantionsCost = power_C5_1_over500 };
      }
      if (document.getElementById("id8").checked) {
        if (connectedPower <= 250) { subStantionsCost = power_C5_2_below250 };
        if ((connectedPower > 250) && (connectedPower <= 500)) { subStantionsCost = power_C5_2_250500 };
        if (connectedPower > 500) { subStantionsCost = power_C5_2_over500 };        
      }
      subStantionsCost = subStantionsCost * connectedPower * NDS;
    }
    else {                                        // Расчёт методом стандартизированной тарифной ставки
      connectedCost = NDS * standart_C1;
      linesCost = NDS * (L1*standart_C2_1 + L2*standart_C3_1 + L3*standart_C3_3 + L4*standart_C2_2 + L5*standart_C2_3 + L6*standart_C3_2 + L7*standart_C3_4);
      if (document.getElementById("id7").checked) {
        if (connectedPower <= 250) { subStantionsCost = standart_C5_1 };
        if ((connectedPower > 250) && (connectedPower <= 500)) { subStantionsCost = standart_C5_2 };
        if (connectedPower > 500) { subStantionsCost = standart_C5_3 };
      }
      if (document.getElementById("id8").checked) {
        if (connectedPower <= 250) { subStantionsCost = standart_C5_4 };
        if ((connectedPower > 250) && (connectedPower <= 500)) { subStantionsCost = standart_C5_5 };
        if (connectedPower > 500) { subStantionsCost = standart_C5_6 };        
      }
      subStantionsCost = subStantionsCost * connectedPower * NDS;
    }
             // Считаем итоговую стоимость
    totalCost = connectedCost + linesCost + subStantionsCost;
    totalCost = Math.round(totalCost * 100) / 100;
  }
  obj.result.value = totalCost;
}
