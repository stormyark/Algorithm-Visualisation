let visualizer = document.getElementById("visualizer");
let canvas = visualizer.getContext("2d");

let array = [];
for (let i = 40; i > 0; i--) {
  array.push(i);
}
let array2 = [
  21, 20, 38, 37, 36, 35, 34, 33, 32, 12, 30, 29, 28, 27, 26, 25, 24, 23, 22,
  40, 39, 19, 18, 17, 16, 15, 14, 13, 31, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
];
//console.log(array);
let array3 = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let array4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let list = array;

let currentIndex = -1; // Variable to track the current index being sorted
let isSorting = false; // Variable to track if a sorting algorithm is running
let speed = 300; // Initial speed of the sorting algorithm
let steps = 0;

/*
Performance (worst-case time complexity):

BubbleSort: O(n^2)
SelectionSort: O(n^2)
InsertionSort: O(n^2)
MergeSort: O(n log n)
QuickSort: O(n log n)
HeapSort: O(n log n)
CountingSort: O(n + k)
ShellSort: O(n log n)
TimSort: O(n log n)
RadixSort: O(nk)

O = Operation (Sorting-Algorithm)
n = Number of Elements
k = range between the smallest and largest element
*/

/* 
BubbleSort: O(n^2)

Index which goes to the entire List, 
if the number its on is larger than the next one, it swaps them.
*/

const bubbleSort = async () => {
  let swapped = true;
  while (swapped && isSorting) {
    swapped = false;
    for (let i = 0; i < list.length - 1; i++) {
      if (!isSorting) return; // Stop if sorting is cancelled
      if (list[i] > list[i + 1]) {
        let temp = list[i];
        list[i] = list[i + 1];
        list[i + 1] = temp;

        currentIndex = i;
        steps++;
        draw(currentIndex);
        swapped = true;
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
  }
};

/*
SelectionSort: O(n^2)

Index which goes to the entire List, 
looking fro the smallest number. 
Once this Array has completely looked over it puts the smallest number 
at the beginning of the Array. This happens until All Elements are Gone.
*/

const selectionSort = async () => {
  for (let i = 0; i < list.length; i++) {
    if (!isSorting) return; // Stop if sorting is cancelled
    let minValue = list[i];
    let index = i;
    for (let j = i; j < list.length; j++) {
      if (list[j] < minValue) {
        minValue = list[j];
        index = j;
      }
    }
    let temp = list[i];
    list[i] = list[index];
    list[index] = temp;

    currentIndex = i;
    steps++;
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
  isSorting = false;
};

/*
InsertionSort: O(n^2)

Creates two arrays, one sorted and one unsorted.
It goes through each element of the unsorted array and compares it to the sorted array.

*/

const insertionSort = async () => {
  for (let i = 0; i < list.length; i++) {
    if (!isSorting) return; // Stop if sorting is cancelled
    let current = list[i]; // current element
    let j = i - 1; // previous element
    while (j >= 0 && list[j] > current) {
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = current;
    currentIndex = i;
    steps++;
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};

/*
MergeSort: O(n log n)

Divide and Conquer (also known as)
Splits the Array in half and sorts each part until every part is solved. 
Then it merges the two halves together.
*/

/*
const split = async (array) => {
  // Basisfall: Wenn das Array 2 oder weniger Elemente hat, stoppe die Rekursion

  if (list.length <= 1) return list;

  const middle = Math.floor(list.length / 2); // middle index

  let leftArray = [];
  let rightArray = [];

  // Teile das Array manuell in zwei Hälften
  for (let i = 0; i < list.length; i++) {
    if (i < middle) {
      leftArray.push(list[i]);
    } else {
      rightArray.push(list[i]);
    }
  }

  console.log("left:" + leftArray);
  console.log("right:" + rightArray);

  await split(leftArray);
  await split(rightArray);
};

const mergeSort = async () => {
  //currentIndex = i;
  await new Promise((resolve) => setTimeout(resolve, speed));
};
*/

/*
CountingSort: O(n + k)

Counting Sort is a non-comparative sorting algorithm that sorts integers by 
counting the number of occurrences of each unique value in the input array. 
It works efficiently when the range of input values (difference between the 
maximum and minimum values) is not too large compared to the number of elements.
*/

const countingSort = async () => {
  // Find the maximum value in the list
  const max = Math.max(...list);

  // Initialize the count array
  const count = new Array(max + 1).fill(0);

  // Store the count of each element
  for (let i = 0; i < list.length; i++) {
    count[list[i]]++;
  }

  // Store the cumulative count
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  // Find the index of each element of the original array in the count array
  // and place the elements in the output array
  const output = new Array(list.length);
  for (let i = list.length - 1; i >= 0; i--) {
    output[count[list[i]] - 1] = list[i];
    count[list[i]]--;
    currentIndex = i;
    steps++;
    draw(currentIndex);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }

  // Copy the sorted elements into the original array
  for (let i = 0; i < list.length; i++) {
    list[i] = output[i];
    draw(i);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};

/*---Template---*/

const Sort = async () => {
  for (let i = 1; i < list.length; i++) {}

  currentIndex = i;
  await new Promise((resolve) => setTimeout(resolve, speed));
};

document
  .getElementById("algorythmSelector")
  .addEventListener("change", async (event) => {
    if (isSorting) {
      isSorting = false; // Stop the current sorting algorithm
      await new Promise((resolve) => setTimeout(resolve, speed)); // Wait for the current sorting to stop
    }

    list = array.slice(); // Reset the list to the original array
    currentIndex = -1;
    steps = 0;
    draw();

    const algorithmName = document.getElementById("algorythmName");

    if (!isSorting) {
      algorithmName.textContent = `${
        event.target.options[event.target.selectedIndex].text
      } is being executed`;
    }

    isSorting = true;
    switch (event.target.value) {
      case "bubbleSort":
        await bubbleSort();
        break;
      case "selectionSort":
        await selectionSort();
        break;
      case "insertionSort":
        await insertionSort();
        break;
      case "countingSort":
        await countingSort();
        break;
    }
    isSorting = false;
    algorithmName.textContent = `Sorting is done. It took ${steps} steps`;
  });

const draw = () => {
  canvas.clearRect(0, 0, visualizer.width, visualizer.height);
  for (let i = 0; i < list.length; i++) {
    if (i === currentIndex) {
      canvas.fillStyle = "red"; // Aktueller Index wird rot
    } else {
      canvas.fillStyle = "green"; // Alle anderen bleiben grün
    }
    // Syntax: fillRect(x, y, width, height);
    canvas.fillRect(i * 25, visualizer.height - list[i] * 20, 20, list[i] * 20);
  }
};

const loop = () => {
  draw();
};

setInterval(loop, speed);

document.getElementById("speed").addEventListener("input", (event) => {
  speed = event.target.value;
  console.log(`Speed changed to: ${speed}`);
});
