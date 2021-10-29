const chartDom = document.getElementById('main');
const myChart = echarts.init(chartDom, 'dark');

window.onresize = function() {
	myChart.resize();
};

let option;

let fun = function() {
	$.getJSON(
		'./data.json', (_rawData) => {
			// let usernames = ["Price", "qwer", "Pop_Slime", "Pikachuwa", "ly55341266", "no_reason", "metaphy",
			// 	"zrl975", "konodioda", "Darren", "cymic", "LLLv_da", "Chordfish", "Wallbreaker5th",
			// 	"ashcastle", "Norato", "goodnightsion", "chendong", "Csome", "FireEgg", "x_17",
			// 	"frankOJ1024", "WHHH", "harrynull", "Upw1nd", "sjspm", "Ephemerally", "zmx0142857",
			// 	"jybuchiyu", "d3280", "SG4YK", "Jackieqian", "yansixing", "Mokkk", "1zero", "anfrsmLena",
			// 	"culionBear", "gmaster", "linx", "tmlwacre", "ice_frost"
			// ];
			let usernames = [];
			for (let item of _rawData.data) {
				usernames.push(item.username);
			}
			// usernames = usernames.slice(0,10);
			usernames = Array.from(new Set(usernames));
			// console.log(usernames.length);

			let name_score = {};
			for (let name of usernames) {
				name_score[name] = 0;
			}

			let data = _rawData;
			let myData = [
				[
					"username",
					"subTime",
					"score"
				]
			];

			for (let item of _rawData.data) {
				if (item.resultId === "4") {
					name_score[item.username]++;
				}

				myData.push([
					item.username,
					new Date(item.subTime).valueOf(),
					name_score[item.username]
				]);
			}

			run(myData, usernames);
		}
	);

	function run(_rawData, usernames) {
		const datasetWithFilters = [];
		const seriesList = [];
		echarts.util.each(usernames, (username) => {
			let datasetId = 'dataset_' + username;
			datasetWithFilters.push({
				id: datasetId,
				fromDatasetId: 'dataset_raw',
				transform: {
					type: 'filter',
					config: {
						and: [{
								dimension: 'subTime',
								gte: 0
							},
							{
								dimension: 'username',
								'=': username
							}
						]
					}
				}
			});
			seriesList.push({
				type: 'line',
				smooth: false,
				step: 'end',
				showSymbol: true,
				symbol: 'circle', //设定为实心点
				symbolSize: 6, //设定实心点的大小
				lineStyle: {
					width: 2, //设置线条粗细
					opacity: 0.9
				},
				datasetId: datasetId,
				name: username,
				endLabel: {
					show: true,
					formatter: (x) => x.value[0],
					fontFamily: `Helvetica, Arial, Sans-Serif`,
					fontWeight: 'bold',
					fontSize: '14px'
				},
				emphasis: {
					focus: 'series'
				},
				encode: {
					x: 'subTime',
					y: 'score'
				}
			});
		});

		option = {
			animationDuration: 200000,
			dataset: [{
					id: 'dataset_raw',
					source: _rawData
				},
				...datasetWithFilters
			],
			title: {
				text: '2021 SoCoding 1024 Puzzle 过题折线榜（总331人）',
				top: 'bottom',
				left: 'center'
			},
			// tooltip: {
			// 	order: 'valueDesc',
			// 	trigger: 'axis'
			// },
			xAxis: {
				type: 'time',
				// nameLocation: 'middle',
				boundaryGap: false,
				name: '时间',
			},
			yAxis: {
				type: 'value',
				name: '过题数',

			},
			grid: {
				right: 140
			},
			series: seriesList
		};
		myChart.setOption(option);
	}
	return true;
};

fun() && option && myChart.setOption(option);
