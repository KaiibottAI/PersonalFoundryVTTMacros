new Dialog({
    title: "Door Actions",
    content: `
        <p>Choose an action:</p>
        <div class="form-group">
            <label>Reset Doors</label>
            <input type="checkbox" name="resetDoors" checked>
        </div>
        <div class="form-group">
            <label>Randomly Change Doors</label>
            <input type="checkbox" name="randomChangeDoors">
        </div>
    `,
    buttons: {
        reset: {
            label: "Apply",
            callback: (html) => {
                const resetDoors = html.find('[name="resetDoors"]').prop('checked');
                const randomChangeDoors = html.find('[name="randomChangeDoors"]').prop('checked');
                const mazeInnerDoors = Tagger.getByTag("maze_innerdoors");

                if (resetDoors) {
                    // reset the doors to closed, and locked
                    mazeInnerDoors.forEach(door => {
                        door.update({
                            door: 2,
                            doorSound: "stoneSandy",
                            ds: 2
                        });
                    });
                }

                if (randomChangeDoors) {
                    // randomly change the doors around from secrets to open
                    mazeInnerDoors.forEach(door => {
                        let randomValue = Math.random(); // random value between 0 and 1

                        if (door.ds === 2) {
                            // 50% chance to open
                            if (randomValue < 0.5) {
                                door.update({ 
                                    doorSound: "",
                                    ds: 1 });
                            }
                        } else if (door.ds === 1) {
                            // 50% chance to open
                            if (randomValue < 0.5) {
                                door.update({ 
                                    doorSound: "",
                                    ds: 2 });
                            }
                        }
                        door.update({
                            doorSound: "stoneSandy"
                        });
                    });
                }
            }
        },
        cancel: {
            label: "Cancel"
        }
    }
}).render(true);