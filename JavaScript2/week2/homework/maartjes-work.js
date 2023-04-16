'use strict';

const monday = [
  {
    name: 'Write a summary HTML/CSS',
    duration: 180,
  },
  {
    name: 'Some web development',
    duration: 120,
  },
  {
    name: 'Fix homework for class10',
    duration: 20,
  },
  {
    name: 'Talk to a lot of people',
    duration: 200,
  },
];

const tuesday = [
  {
    name: 'Keep writing summary',
    duration: 240,
  },
  {
    name: 'Some more web development',
    duration: 180,
  },
  {
    name: 'Staring out the window',
    duration: 10,
  },
  {
    name: 'Talk to a lot of people',
    duration: 200,
  },
  {
    name: 'Look at application assignments new students',
    duration: 40,
  },
];

const maartjesTasks = monday.concat(tuesday);
const maartjesHourlyRate = 20;

function computeEarnings(tasks, hourlyRate) {
  // Map the tasks to durations in hours.
  const tasksInHours = tasks.map(task => task.duration / 60);

  // Filter out everything that took less than two hours (i.e., remove from the collection)
  const filteredTasks = tasksInHours.filter(duration => duration >= 2);

  // Multiply the each duration by a per-hour rate for billing (use €20/hour) and sum it all up.
  // Output a formatted Euro amount, rounded to Euro cents, e.g: €11.34.
  const calculatedEarnings = filteredTasks.reduce(
    (sum, duration) => sum + duration * hourlyRate,
    0,
  );
  return calculatedEarnings;
}

// eslint-disable-next-line no-unused-vars
const earnings = computeEarnings(maartjesTasks, maartjesHourlyRate);

// add code to convert `earnings` to a string rounded to two decimals (euro cents)
console.log(`Maartje has earned €${computeEarnings(maartjesTasks, maartjesHourlyRate).toFixed(2)}`);

// Do not change or remove anything below this line
module.exports = {
  maartjesTasks,
  maartjesHourlyRate,
  computeEarnings,
};
