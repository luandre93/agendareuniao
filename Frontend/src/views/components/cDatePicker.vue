<template>
  <div id="sweetCalendar">
    <div class="container date-picker">
      <div class="row mx-auto">
        <div type="button" class="left-arrow mr-3" @click="prevMonth">
          <span class="fa fa-arrow-left fa-fw"></span>
        </div>
        <div class="month">{{ selectedMonthName }} {{ selectedYear }}</div>
        <div type="button" class="right-arrow ml-3" @click="nextMonth">
          <span class="fa fa-arrow-right fa-fw"></span>
        </div>
      </div>
      <div class="body">
        <div
          v-for="(day, index) in weekdays"
          :key="`day-name-${index + 1}`"
          class="day-name"
          :title="day"
        >{{ day[0] }}</div>
        <div v-for="(day,index) in days" :key="index" class="day-container">
          <div
            v-if="day"
            :class="[
              'day',
              `day-${day.getDate()},
              weekday-${day.getDay()}`,
              offDays.includes(day.getDay()) ? 'off-day' : null,
              day.toDateString() === today.toDateString() ? 'today' : null,
              isSelected(day) ? 'selected' : null
            ]"
            @click="selectDay(day)"
          >
            <span>{{ day.getDate() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from "@/libs/DateTime.js";

export default {
  name: "DatePicker",
  data() {
    return {
      today: new DateTime(),
      date: null,
      weekdays: null
    };
  },
  computed: {
    days() {
      let emptyDays = Array(
        (this.startWeekDayOfMonth - this.firstDayOfWeek + 7) % 7
      ).fill(null);
      let days = Array(this.numberOfDays)
        .fill()
        .map(
          (item, index) =>
            new DateTime(this.selectedYear, this.selectedMonth, index + 1)
        );
      return emptyDays.concat(days);
    },
    startWeekDayOfMonth() {
      return this.date.getFirstWeekdayOfMonth();
    },
    numberOfDays() {
      return this.date.getNumberOfDaysInMonth();
    },
    selectedMonth() {
      return this.date.getMonth();
    },
    selectedMonthName() {
      return this.date.getMonthName();
    },
    selectedYear() {
      return this.date.getFullYear();
    }
  },
  methods: {
    prevMonth() {
      this.date = new DateTime(this.selectedYear, this.selectedMonth - 1, 1);
    },
    nextMonth() {
      this.date = new DateTime(this.selectedYear, this.selectedMonth + 1, 1);
    },
    generateWeekdayNames(firstDayOfWeek = 1) {
      let weekdays = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sabado"
      ];
      for (let i = 2; i <= firstDayOfWeek; i++) {
        let first = weekdays.shift();
        weekdays.push(first);
      }
      return weekdays;
    },
    selectDay(day) {
      this.$emit("setDate", {
        iso: day.toISOString(),
        timeZoneOffset: day.getTimezoneOffset()
      });
    },
    isSelected(day) {
      if (!this.selectedDate) {
        return false;
      }
      return (
        day.toDateString() === new DateTime(this.selectedDate).toDateString()
      );
    }
  },
  props: {
    initialDate: {
      type: String,
      default: null
    },
    selectedDate: {
      type: String,
      default: null
    },
    firstDayOfWeek: {
      type: Number,
      default: 1 // 1: Sunday, 2: Monday, etc
    },
    offDays: {
      type: Array,
      default() {
        return [1, 7];
      }
    }
  },
  beforeMount() {
    this.date = Date.parse(this.initialDate)
      ? new DateTime(this.initialDate)
      : new DateTime();
    this.weekdays = this.generateWeekdayNames(this.firstDayOfWeek);
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/css/index.sass'
</style>
