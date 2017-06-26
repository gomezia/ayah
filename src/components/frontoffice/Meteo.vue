<template>
  <div>
    <div class="ui card meteo">
      <div class="content">
        <div class="right floated mini ui image">
          <img :src="meteo.fcst_day_0.icon_big" alt="meteo lyon">
        </div>
        <div class="header">{{meteo.city_info.name}} | {{meteo.current_condition.tmp}}°</div>
        <div class="meta">
          <a>{{meteo.city_info.country}}</a>
        </div>
      </div>

      <div class="content">
        <div class="description">
          {{meteo.current_condition.condition}}, Pression: {{meteo.current_condition.pressure}}, humidité: {{meteo.current_condition.humidity}}
        </div>
      </div>
      <div class="extra content">
        <span class="right floated">
            {{meteo.fcst_day_0.day_long + ' ' + meteo.fcst_day_0.date}}
        </span>
        <!-- <span>
          <i class="time icon"></i>
          {{meteo.current_condition.hour}}
        </span> -->
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Meteo',
  data () {
    return {
      meteo: []
    }
  },
  mounted() {
    // this.loading = true
    //
    this.$user = this.$resource('http://www.prevision-meteo.ch/services/json/lyon')

    this.$user.query().then((response)=> {
      response.json().then((data) =>{
        this.meteo = data
        console.log(this.meteo)
      })
    }, (response) => {
       console.log('error', response)
    })
  }
}
</script>
