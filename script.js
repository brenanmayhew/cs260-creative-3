/*
$(document).ready(function(){
  $('input[name="date"]').datepicker({
		format: 'mm/dd/yyyy', 
		todayHighlight: true, 
		autoclose: true, 
		endDate: new Date(), 
	});
})
*/

Vue.component('my-date-picker',{
    template: '<input type="text" v-datepicker class="datepicker" :value="value" @input="update($event.target.value)">',
    directives: {
        datepicker: {
            inserted (el, binding, vNode) {
                $(el).datepicker({
                    format: 'mm/dd/yyyy',
										todayHighlight: true,
										autoclose: true,
										endDate: new Date()
                }).on('changeDate',function(e){
                    vNode.context.$emit('input', e.format(0))
                })
            }
        }
    },
    props: ['value'],
    methods: {
        update (v){
            this.$emit('input', v)
        }
    }
})

let app = new Vue({
	el: '#welcome',
	data: {
		date: '',
		goodDate: '',
		dateNum: '',
		current: {},
		loading: false,
		showAddComment: false,
		addedName: '',
		addedComment: '',
		comments: {}
	},
	methods: {
		getAPOD() {
			this.loading = true;
			console.log(this.date, this.goodDate);
			axios.get('https://api.nasa.gov/planetary/apod?date=' + this.goodDate + '&api_key=gmkr2JQnlSozUzaMAoEiS8JWdVz2RILzIAFMg0Aa')
				.then(response => {
					let results = "";
					results += '<h2 id="apiTitle">NASAs Astronomy Picture of the Day</h2>';
					results += '<img src="' + response.data.url + '" width="50%"/>';
					results += '<p id="apiExplanation">' + response.data.explanation + '</p>';
					document.getElementById("apodResult").innerHTML = results;
					document.getElementById("apiTitle").setAttribute("style", "margin: 100px 0 10px 0;");
					document.getElementById("apiExplanation").setAttribute("style", "margin: 10px 0 200px 0;");
					this.date = '';
					this.goodDate = '';
					this.dateNum = '';
					this.loading = false;
					this.showAddComment = true;
					return true;
				})
				.catch(error => {
					this.date = '';
					this.loading = false;
					this.showAddComment = false;
				});
		},
		addComment() {
			if (!(this.dateNum in this.comments)) {
				Vue.set(app.comments, this.dateNum, new Array);
			}
			let date = new Date();
			this.comments[this.dateNum].push({
				author: this.addedName,
				text: this.addedComment,
				datetime: date.toLocaleString()
			});
			this.addedName = '';
			this.addedComment = '';
		}
	},
	watch: {
		date(value, oldvalue) {
			if (value !== '') {
				console.log(value);
				let newDate = value.split('/');
				this.goodDate = newDate[2] + '-' + newDate[0] + '-' + newDate[1];
				this.dateNum = newDate[2] + newDate[0] + newDate[1];
			}
		}
	}
});
