new Dialog({
  title: "Change Darkness Level",
  content: `
      <form>
        <div class="form-group">
          <label for="darknessLevel">Darkness Level:</label>
          <input type="range" id="darknessLevel" name="darknessLevel" min="0" max="1" step="0.01" value="${game.scenes.viewed.darkness}">
          <output for="darknessLevel" id="darknessOutput">${game.scenes.viewed.darkness}</output>
        </div>
        <div class="form-group">
          <label for="timeOfDay">Estimated Time of Day:</label>
          <output id="timeOfDayOutput"></output>
        </div>
      </form>
    `,
  buttons: {
    change: {
      icon: "<i class='fas fa-check'></i>",
      label: "Change",
      callback: (html) => {
        let targetDarknessLevel = parseFloat(html.find("#darknessLevel")[0].value);
        let currentDarknessLevel = game.scenes.viewed.darkness;

        // Calculate the step size for the transition
        let stepSize = 0.01;
        let numSteps = Math.abs(targetDarknessLevel - currentDarknessLevel) / stepSize;

        // Update darkness level incrementally
        for (let i = 1; i <= numSteps; i++) {
          setTimeout(() => {
            let newDarknessLevel = currentDarknessLevel + (targetDarknessLevel - currentDarknessLevel) * (i / numSteps);
            game.scenes.viewed.update({ darkness: newDarknessLevel });
          }, i * 100); // Adjust delay as needed
        }
      }
    },
    cancel: {
      icon: "<i class='fas fa-times'></i>",
      label: "Cancel"
    }
  },
  default: "change",
  render: (html) => {
    html.on("input", "#darknessLevel", (event) => {
      let output = html.find("#darknessOutput");
      output.text(event.target.value);

      let timeOfDayOutput = html.find("#timeOfDayOutput");
      timeOfDayOutput.text(getTimeOfDay(event.target.value));
    });
  }
}).render(true);

function getTimeOfDay(darknessLevel) {
  if (darknessLevel === 0) {
    return "High Noon";
  } else if (darknessLevel < 0.25) {
    return "Morning";
  } else if (darknessLevel < 0.5) {
    return "Daytime";
  } else if (darknessLevel === 0.5) {
    return "Dusk/Twilight";
  } else if (darknessLevel < 0.75) {
    return "Nightfall";
  } else if (darknessLevel < 1) {
    return "Night";
  } else {
    return "Midnight";
  }
}