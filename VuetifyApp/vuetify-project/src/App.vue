<template>
  <v-app>
    <v-main>

      <div id="top-bar">
        <h1>{{ title }}</h1>
      </div>

      <div id="container">

        <div id="data-api-group">

          <v-select v-model="selectedDataApiLink" :items="dataApis" item-title="name" item-value="link"
            label="OpenData API" hide-details="auto" class="select" variant="outlined"></v-select>
          <p>{{ requestUrl }}</p>
        </div>

        <!-- <for-item :url="requestUrl" :openDataApi="selectedDataApiName" :parameters="currentParameters"></for-item> -->

        <repository-item/>
      </div>

      <!-- <parent-item/> -->
      <!-- <table-item /> -->
      <!-- <pokemon-item /> -->
      <!--request-item /> -->
    </v-main>

  </v-app>
</template>

<script>

export default {

  data() {
    return {
      title: 'Vuetify App',
      standardUrl: 'http://192.168.56.56/api/',
      test: 'Postcode',
      kadasterParameters: [
        {
          key: 'Postcode',
          value: ''
        },
        {
          key: 'Huisnummer',
          value: ''
        },
        {
          key: 'Plaats',
          value: ''
        }
      ],
      kvkParameters: [
        {
          key: 'KvkNummer',
          value: ''
        },
        {
          key: 'Huisnummer',
          value: ''
        },
        {
          key: 'Plaats',
          value: ''
        },
        {
          key: 'Plaats',
          value: ''
        },
        {
          key: 'Plaats',
          value: ''
        },
        {
          key: 'Plaats',
          value: ''
        }
      ],
      rdwParameters: [
        {
          key: 'Kenteken',
          value: ''
        }
      ],
      selectedDataApiName: 'Kadaster',
      selectedDataApiLink: 'key',
      selectedDataApi: {
        name: 'Kadaster',
        link: 'key'
      },
      dataApis: [
        {
          name: 'Kadaster',
          link: 'key'
        }, {
          name: 'KvK',
          link: 'company'
        }, {
          name: 'RDW',
          link: 'car'
        }
      ]
    }
  },
  watch: {
    selectedDataApiLink() {

      switch (this.selectedDataApiLink) {

        case 'key':
          this.selectedDataApiName = 'Kadaster';
          break;

        case 'company':
          this.selectedDataApiName = 'Kvk';
          break;

        case 'car':
          this.selectedDataApiName = 'RDW';
          break;
      }
    }
  },
  computed: {
    requestUrl: {
      get() {
        return `${this.standardUrl}${this.selectedDataApiLink}`;
      }
    }
    ,
    currentParameters: {
      get() {

        console.log(this.selectedDataApiLink);
        switch (this.selectedDataApiLink) {

          case 'key':
            return this.kadasterParameters;

          case 'company':
            return this.kvkParameters;

          case 'car':
            return this.rdwParameters;
        }
      }
    }
  }
}

</script>

<style>
p {
  font-weight: bolder;
  display: flex;
  flex-basis: 75%;
  flex-direction: column;
  justify-content: center;
  width: auto;
}

#top-bar {
  background-color: rgb(64, 64, 64, 0.8);
  border: solid 5px whitesmoke;
  margin: 10px;
}

#top-bar>h1 {
  color: whitesmoke;
  margin-left: 10px;
}

#container {
  background-color: rgb(64, 64, 64);
  border: solid whitesmoke 5px;
  width: calc(100% -20px);
  margin: 10px;
}

#data-api-group {
  display: flex;
  flex-direction: row;
  width: 640px;
  margin: 20px 0px;
}

#data-api-group>p {
  flex-basis: 75%;
  width: auto;
  margin: 0;
}

#data-api-group>.select {
  margin: 0 20px;
  flex-basis: 25%;
}
</style>
