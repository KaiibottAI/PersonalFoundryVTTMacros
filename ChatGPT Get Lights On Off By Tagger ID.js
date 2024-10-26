// Get lights by tag
const frontStageLights = Tagger.getByTag("front-stage-lights");
const audienceLights = Tagger.getByTag("crowd-lights-01");
const frontEntranceLights = Tagger.getByTag("front-entrance-lights");

// Create a pop-up dialog
new Dialog({
    title: "Toggle Lights",
    content: `
        <div>
            <p>Select the lights to toggle:</p>
            <label><input type="checkbox" id="frontStageCheckbox"> Front Stage Lights</label><br>
            <label><input type="checkbox" id="audienceCheckbox"> Audience Lights</label><br>
            <label><input type="checkbox" id="frontEntranceLights"> Front Entrance Lights</label>
        </div>
    `,
    buttons: {
        toggle: {
            label: "Toggle Lights",
            callback: () => {
                // Toggle the visibility of front stage lights if the checkbox is checked
                if (document.getElementById("frontStageCheckbox").checked) {
                    frontStageLights.forEach(light => {
                        light.update({
                            'hidden': !light.hidden,
                        });
                    });
                }
                // Toggle the visibility of audience lights if the checkbox is checked
                if (document.getElementById("audienceCheckbox").checked) {
                    audienceLights.forEach(light => {
                        light.update({
                            'hidden': !light.hidden,
                        });
                    });
                }                
                // Toggle the visibility of audience lights if the checkbox is checked
                if (document.getElementById("frontEntranceLights").checked) {
                    frontEntranceLights.forEach(light => {
                        light.update({
                            'hidden': !light.hidden,
                        });
                    });
                }
            }
        },
        close: {
            label: "Close",
            callback: () => { } // This is an empty callback to prevent closing the dialog
        }
    }
}).render(true);