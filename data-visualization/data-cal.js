let chartDom = document.getElementById('main');
let myChart = echarts.init(chartDom, 'dark');
let option;

let new_data;

function update() {
	$.getJSON('./data.json', (json) => {
		new_data = [];
		for (let item of json.data) {
			if (item.resultId === '4') {
				new_data.push([item.username, item.alphabetId, new Date(item.subTime).valueOf()]);
			}
		}

		let slice_num2 = Math.floor(new_data.length * t_num);
		new_data = new_data.slice(0, slice_num2);

		// console.log(new_data);

		let users = {};

		for (let item of new_data) {
			let [username, alphabetId, time] = item;

			let user = users[username];
			if (user === undefined) {
				user = users[username] = {
					accpted: {}
				};
			}

			if (user.accpted[alphabetId] === undefined) {
				user.accpted[alphabetId] = time;
			}

		}

		// console.log(users);


		let sort_data = [];

		for (let username in users) {
			let cnt = Object.keys(users[username].accpted).length;
			sort_data.push({
				username: username,
				accpted: users[username].accpted,
				cnt: cnt
			});
		}

		let sorted_data = sort_data.sort((a, b) => {
			return b.cnt - a.cnt;
		});

		let slice_num = Math.floor(sorted_data.length * 0.2);
		sorted_data = sorted_data.slice(0, slice_num);

		// console.log(sorted_data);

		let my_data = {};
		for (let item of sorted_data) {
			let username = item.username;
			let accpted = item.accpted;

			let accpted_data = [];
			for (let i = 1; i <= 28; i++) {
				let key = i.toString().padStart(2, '0');
				let num = accpted[key] || -1;
				accpted_data.push(num);
			}

			my_data[username] = accpted_data;
		}

		// console.log(my_data);

		function distance(vec1, vec2) {
			let length = Math.min(vec1.length, vec2.length);
			let sum = 0;
			for (let i = 0; i < length; i++) {
				sum += (vec1[i] - vec2[i]) ** 2;
			}
			// return sum;
			return Math.log(sum);
		}

		let map = new Map();
		for (let name1 in my_data) {
			for (let name2 in my_data) {
				if (name1 !== name2) {
					let vec1 = my_data[name1];
					let vec2 = my_data[name2];

					// let cnt = Object.keys(users[name1].accpted).length
					let dis = distance(vec1, vec2) / 2;

					let old_dis = map.get(name1);
					if (old_dis === undefined || old_dis > dis) {
						map.set(name1, dis);
					}
				}
			}
		}

		// console.log(map);

		let next_data = Array.from(map).sort((a, b) => {
			// let x = Object.keys(users[a[0]].accpted).length;
			// let y = Object.keys(users[b[0]].accpted).length;
			// return y - x;

			return a[1] - b[1];
		});

		// console.log(next_data);

		let x_data = [];
		let y_data = [];
		let bar_data = [];

		for (let item of next_data) {
			x_data.push(item[0]);
			y_data.push(item[1]);
		}

		for (let username of x_data) {
			let cnt = Object.keys(users[username].accpted).length;
			bar_data.push(cnt);
		}

		render_charts(x_data, y_data, bar_data);
	});
}

function render_charts(x_data, y_data, bar_data) {
	option = {
		animationDuration: 100,
		animationDurationUpdate: 100,
		title: {
			text: `${Math.ceil(t_num * 100)}% ` + new Date(new_data[new_data.length - 1][2]),
			left: 'center'
		},
		xAxis: {
			axisLabel: {
				show: true,
				interval: 0,
				rotate: 40,
				textStyle: {
					color: '#fff',
					fontSize: 10
				}
			},
			type: 'category',
			data: x_data
		},
		yAxis: {
			type: 'value'
		},
		series: [{
				type: 'line',
				data: y_data
			},
			{
				type: 'bar',
				data: bar_data
			}
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		}
	};

	myChart.setOption(option);
}

let num = 0;
let t_num = 0;
setInterval(() => {
	num = num % 100 + 1;
	t_num = num / 100;
	update();
}, 200);

// t_num = 1;
// update();
