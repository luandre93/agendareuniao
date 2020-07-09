<template>
  <nav class="calendar d-lg-block border rounded float-right">
    <div class>
      <div class="text-left font-weight-bold p-2">
        <span class="fa fa-calendar-o fa-fw mr-2"></span>
        <a class>Calendário</a>
      </div>
      <div class>
        <cDatePicker @setDate="setDate" :selectedDate="selectedDate.iso" />
      </div>
    </div>
  </nav>
</template>

<script>
import cDatePicker from "@/views/components/cDatePicker.vue";
export default {
  name: "app",
  components: {
    // cCalendar,
    cDatePicker
  },
  data() {
    return {
      eventCategories: [
        {
          id: 1,
          title: "Personal",
          textColor: "white",
          backgroundColor: "Blue"
        },
        {
          id: 2,
          title: "Company-wide",
          textColor: "white",
          backgroundColor: "red"
        }
      ],
      events: [
        {
          title: "test1",
          start: "2020-07-06",
          end: "2020-07-06",
          repeat: "never",
          categoryId: 1
        },
        {
          title: "test2",
          start: "2019-04-08",
          end: "2019-04-09",
          repeat: "monthly",
          categoryId: 1
        },
        {
          title: "test3",
          start: "2019-04-10",
          end: "2019-04-11",
          repeat: "yearly",
          categoryId: 2
        },
        {
          title: "test4",
          start: "2019-04-23",
          end: "2019-04-23",
          repeat: "monthly",
          categoryId: 2
        }
      ],
      selectedDate: {}
    };
  },
  methods: {
    goToday() {
      this.$refs.calendar.goToday();
    },
    setDate(date) {
      this.selectedDate = date;
    }
  }
};
</script>

