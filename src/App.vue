<template>
  <div class="test">
    <!-- initiate Navbar -->
    <NavBar />

    <!-- create column and center it for main content -->
    <div class="columns is-mobile is-centered pt-5 ">
      <div class="column is-8">
        <div> 
          <stack
            :column-min-width="320"
            :column-max-width="400"
            :gutter-width="20"
            :gutter-height="20"
            :monitor-images-loaded="true"
          >
          <!-- use vue library vue-grid-stack for stacking cards automatically -->
            <stack-item v-for="(data, index) in comicData" :key="index">
              <div class="card has-text-centered">
                <div class="card-image pt-5">
                  <figure class="pt-5">

                    <!-- check is page is loading -->
                    <div v-if="loading">
                      <img class="image-round is-loading" src="loading.gif" />
                    </div>

                    <!-- if page loaded create cards and add image,claps -->
                    <div v-else>
                      <div class="columns pl-1">
                        <div class="column has-text-centered is-1 ">
                          <div class="clickable" @click="incrementRating()">
                            <b-icon class="green" icon="arrow-up"></b-icon>
                          </div>
                          <span class="">{{ ratings }} 👏</span>
                          <div class="clickable" @click="decrementRating()">
                            <b-icon class="red" icon="arrow-down"></b-icon>
                          </div>
                        </div>
                        <div
                          class="column is-10"
                          @click="launchModal(index, data.img, data)"
                        >
                          <v-lazy-image
                            class="clickable"
                            v-bind:src="data.img"
                            :src-placeholder="require('./dist/loading.gif')"
                            use-picture
                          />
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </stack-item>
          </stack>
        </div>
      </div>
      
      <!-- create single modal and bind with current selection-->
      <b-modal v-model="currentselection">
        <div class="card">
          <div class="card-image">
            <figure class="image pt-3">
              <img v-bind:src="modalImage" alt="Placeholder image" />
            </figure>
          </div>
          <!-- define modal content -->
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Title: {{ modalTitle }}</p>
                <p class="subtitle is-6">
                  Comic Number📋 : {{ modalNumber }}
                  <br />
                  Date 🗓️ : {{ modalDay }}/{{ modalMonth }}/{{ modalYear }}
                  <br />
                  Claps 👏 : {{ ratings }}
                  <span class="clickable" @click="incrementRating()">
                    <b-icon class="green" icon="arrow-up"></b-icon>
                  </span>
                  <span class="clickable" @click="decrementRating()">
                    <b-icon class="red" icon="arrow-down"></b-icon>
                  </span>
                </p>
              </div>
            </div>

            <div class="content">
              <strong> Transcript</strong> 📚
              <br />
              {{ modalTranscript }}
              <br />
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <!-- add reload button at the end -->
    <div class="columns is-centered is-vcentered is-fullhd pt-5 pb-5">
      <div v-if="buttonLoading" class="column is-narrow has-text-centered">
        <b-button
          class="is-loading"
          type="is-dark"
          icon-left="sync"
          size="is-medium"
          rounded
          @click="fetchComic"
          >Reload</b-button
        >
      </div>
      <div v-else class="column is-narrow has-text-centered">
        <b-button
          type="is-dark"
          icon-left="sync"
          size="is-medium"
          rounded
          @click="fetchComic"
          >Reload</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/Navbar";
import axios from "axios";
import { Stack, StackItem } from "vue-stack-grid";

export default {
  name: "App",
  components: { NavBar, Stack, StackItem },
  data() {
    return {
      comicData: [],
      loading: true,
      buttonLoading: false,
      ratings: 45,
      currentselection: null,
      modalTitle: null,
      modalImage: null,
      modalTranscript: null,
      modalYear: null,
      modalMonth: null,
      modalDay: null,
      modalNumber: null,
    };
  },
  methods: {
    //method to fetch comic from proxy
    fetchComic() {
      this.buttonLoading = true;
      this.loading = true;
      axios({
        method: "get",
        url: "https://tini-tiny-nodejs.herokuapp.com/tini/comics",
        timeout: 100 * 1000, // Let's say you want to wait at least 4 mins
      })
        .then((response) => {
          if (response.status === 200) {
            this.comicData = response.data.data;
            this.$store.commit("setComicData", response.data.data);
            this.loading = false;
            this.buttonLoading = false;
          } else if (response.status === 400) {
            this.$buefy.toast.open({
              duration: 5000,
              message: "Proxy server failed to resolve request to XKCD ",
              position: "is-bottom",
              type: "is-danger",
            });
          } else {
            this.$buefy.toast.open({
              duration: 5000,
              message: "Proxy server failed to resolve request to XKCD",
              position: "is-bottom",
              type: "is-danger",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$buefy.toast.open({
            duration: 5000,
            message: "Proxy server timed out",
            position: "is-bottom",
            type: "is-danger",
          });
          this.buttonLoading = false;
        });
    },

    //increment rating at local state
    incrementRating() {
      this.ratings += 1;
    },
    //decrement rating at local state
    decrementRating() {
      this.ratings -= 1;
    },
    //launch modal and grab data from current selection
    launchModal(index, image, data) {
      this.currentselection = true;
      this.modalImage = data.img;
      this.modalTitle = data.title;
      this.modalTranscript = data.transcript;
      this.modalYear = data.year;
      this.modalMonth = data.month;
      this.modalDay = data.day;
      this.modalNumber = data.num;
    },
  },
  //grab comics data before mounting to page
  beforeMount() {
    this.fetchComic();
  },
  //initial VUEX implementation for state management *has not been completed yet
  mounted() {
    this.comicData = this.$store.getters.getComicData;
  },
};
</script>




<style>
/* ****ALL THE FANCY IS HERE**** */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.sidebar {
  background-color: saddlebrown;
}

.test {
  background-color: #ebebeb;
}
.green {
  color: rgb(0, 196, 0);
}
.red {
  color: rgb(255, 80, 80);
}
.clickable {
  cursor: pointer;
}
</style>
