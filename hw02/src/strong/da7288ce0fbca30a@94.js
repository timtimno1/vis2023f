function _1(md){return(
md`# HW2 Strong baseline (1pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _constellations(){return(
[ "牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
)}

function _barChartData(){return(
[]
)}

function _5(barChartData,constellations,data)
{
  barChartData.length = 0
  let order = 0;
  constellations.forEach((item) => {
    barChartData.push({ constellations: item, Gender: "男", count: 0, order: order })
    barChartData.push({ constellations: item, Gender: "女", count: 0, order: order++ })
  })
  data.forEach(( item ) => {
    let i = item.Constellation * 2 + ( item.Gender == "男" ? 0 : 1 )
    barChartData[i].count++;
  })
  return barChartData
}


function _6(Plot,barChartData){return(
Plot.plot({
  grid: true,
  y: { label: "count" },
  color: { legend: true },
  marks: [
    Plot.ruleY([0]),
    Plot.barY( barChartData, {
        x: "constellations",
        y: "count",
        fill: "Gender",
        channels: {
          order: "order",
        },
        tip: true,
        sort: {x: "order"}
    }),
  ]
})
)}

function _7(Plot,constellations,data){return(
Plot.plot({
  x: { grid: true, ticks: 10, tickFormat: (d) => constellations[d] },
	y: { grid: true, label: "count" },
  color: { legend: true },
	marks: [   
		Plot.rectY( data, Plot.binX({ y:"count" }, { x:"Constellation", interval: 1, fill: "Gender", tip: true })), 
		Plot.gridY({ interval: 1, strokeOpacity: 0 })
	]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellations")).define("constellations", _constellations);
  main.variable(observer("barChartData")).define("barChartData", _barChartData);
  main.variable(observer()).define(["barChartData","constellations","data"], _5);
  main.variable(observer()).define(["Plot","barChartData"], _6);
  main.variable(observer()).define(["Plot","constellations","data"], _7);
  return main;
}
