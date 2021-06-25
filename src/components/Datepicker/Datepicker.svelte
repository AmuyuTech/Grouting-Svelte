<script>
    import { createEventDispatcher } from "svelte";
    import Calender from "./Calender.svelte";
    import { getMonthName } from "./date-time.js";
  
    const dispatch = createEventDispatcher();
  
    // props
    export let isAllowed = () => true;
    export let selected = new Date();
    export let label = ''
  
    // state
    let date, month, year, showDatePicker;
  
    // so that these change with props
    $: {
      date = selected.getDate();
      month = selected.getMonth();
      year = selected.getFullYear();
    }
  
    // handlers
    const onFocus = () => {
      showDatePicker = true;
    };
  
    const next = () => {
      if (month === 11) {
        month = 0;
        year = year + 1;
        return;
      }
      month = month + 1;
    };
  
    const prev = () => {
      if (month === 0) {
        month = 11;
        year -= 1;
        return;
      }
      month -= 1;
    };
  
    const onDateChange = d => {
      showDatePicker = false;
      dispatch("datechange", d.detail);
    };
  </script>
  
  <style>
    .relative {
      position: relative;
    }
    .box {
      position: absolute;
      top: 40px;
      left: 0px;
      border: 1px solid green;
      display: inline-block;
      z-index: 3;
    }
  
    .month-name {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 6px 0;
      background-color: white;
    }
  
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button {
        width: auto;
        background-color: transparent;
border-block: transparent;
border: none;

    }
    svg {
        width: 3rem;
    }
    button:not(:disabled):active {
    background-color: transparent;
}
  </style>
  
  <div class="relative">
      <label for="inp">{label}</label> 
    <input type="text" name="inp" on:focus={onFocus} value={selected.toLocaleString('es-BO', {year: 'numeric', month: 'long', day: 'numeric'})} />
    {#if showDatePicker}
      <div class="box">
        <div class="month-name">
          <div class="center">
            <button on:click={prev}><svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
                ><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg
              ></button>
          </div>
          <div class="center">{getMonthName(month)} {year}</div>
          <div class="center">
            <button on:click={next}><svg viewBox="0 0 24 24" focusable="false" class="mat-paginator-icon"
                ><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg
              ></button>
          </div>
        </div>
        <Calender
          {month}
          {year}
          date={selected}
          {isAllowed}
          on:datechange={onDateChange} />
      </div>
    {/if}
  </div>