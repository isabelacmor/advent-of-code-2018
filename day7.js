let start = new Date().getTime();
let part1 = () => {
    let nodes = setupNodes();

    topSort(nodes);
};

let part2 = () => {
    let nodes = setupNodes();

    // A worker keeps track of which task they're working on
    let workers = [];
    for (let i = 0; i < 5; i++) {
        workers.push(null);
    }


    let availableTasks = [];
    let numVisited = 0;
    let totalTime = 0;
    let res = "";

    // Find all valid start nodes and add them as available tasks
    nodes.forEach(node => {
        if (node.inDeg === 0) {
            availableTasks.push(node);
        }
    });

    // Keep going until we've seen all the nodes
    while (numVisited != nodes.length) {

        // Sort available tasks alphabetically
        availableTasks.sort((a, b) => { return a.id - b.id });

        // Try to assign available tasks to available workers
        for (let i = 0, j = 0; i < availableTasks.length && j < workers.length; i++) {
            // Find next worker
            while (j < workers.length && workers[j] !== null) {
                j++;
            }

            // Make sure that if we went OOB before, we don't accidentally add an extra worker
            if (j < workers.length) {
                // Mark the task as running. This prevents us from adding duplicate tasks if it has multiple parents
                availableTasks[i].running = true;

                // Assign this task to this worker
                workers[j] = availableTasks[i];

                // Remove the available task from the list, but also decrement i since we're removing an element
                availableTasks.splice(i, 1);
                i--;
            }
        }

        // Go through all the workers that have tasks and decrease their task's time
        workers.forEach(task => {
            if (task) {
                task.time--;
            }
        });

        // Go through all workers, remove tasks that are done and add their children to the list of available tasks
        workers.forEach((task, index) => {
            // A task if done if its time has hit zero
            if (task && task.time <= 0) {
                // Add the node that's done to our resulting string
                res += String.fromCharCode(task.id + 65);
                task.children.forEach(child => {
                    // Decrement the child's inDeg since we finished one parent
                    nodes[child].inDeg--;

                    // A task is available if it's not currently running and has no other nodes that need to run before it
                    if (!nodes[child].running && nodes[child].inDeg === 0) {
                        availableTasks.push(nodes[child]);
                    }
                });
                workers[index] = null;
                numVisited++;
            }
        });

        totalTime++;
    }

    console.log(res);
    console.log(totalTime);

    let end = new Date().getTime();
    console.log(`\nPart 2 executed in ${end - start} ms`);
};

let setupNodes = () => {
    let multiInput = ["Step C must be finished before step A can begin.", "Step Z must be finished before step A can begin.", "Step Y must be finished before step A can begin.", "Step X must be finished before step A can begin.", "Step W must be finished before step A can begin.", "Step V must be finished before step A can begin."];
    let testInput = ["Step C must be finished before step A can begin." , "Step C must be finished before step F can begin." , "Step A must be finished before step B can begin." , "Step A must be finished before step D can begin." , "Step B must be finished before step E can begin." , "Step D must be finished before step E can begin." , "Step F must be finished before step E can begin."];
    let input = ["Step S must be finished before step B can begin." , "Step B must be finished before step Y can begin." , "Step R must be finished before step E can begin." , "Step H must be finished before step M can begin." , "Step C must be finished before step F can begin." , "Step K must be finished before step A can begin." , "Step V must be finished before step W can begin." , "Step W must be finished before step L can begin." , "Step J must be finished before step L can begin." , "Step Q must be finished before step A can begin." , "Step U must be finished before step L can begin." , "Step Y must be finished before step M can begin." , "Step T must be finished before step F can begin." , "Step D must be finished before step A can begin." , "Step I must be finished before step M can begin." , "Step O must be finished before step P can begin." , "Step A must be finished before step L can begin." , "Step P must be finished before step N can begin." , "Step X must be finished before step Z can begin." , "Step G must be finished before step N can begin." , "Step M must be finished before step F can begin." , "Step N must be finished before step L can begin." , "Step F must be finished before step Z can begin." , "Step Z must be finished before step E can begin." , "Step E must be finished before step L can begin." , "Step O must be finished before step X can begin." , "Step B must be finished before step V can begin." , "Step H must be finished before step Q can begin." , "Step T must be finished before step M can begin." , "Step A must be finished before step G can begin." , "Step R must be finished before step H can begin." , "Step S must be finished before step C can begin." , "Step N must be finished before step Z can begin." , "Step Z must be finished before step L can begin." , "Step Q must be finished before step Z can begin." , "Step R must be finished before step G can begin." , "Step P must be finished before step Z can begin." , "Step U must be finished before step M can begin." , "Step W must be finished before step D can begin." , "Step F must be finished before step L can begin." , "Step D must be finished before step P can begin." , "Step I must be finished before step E can begin." , "Step M must be finished before step E can begin." , "Step H must be finished before step N can begin." , "Step F must be finished before step E can begin." , "Step D must be finished before step L can begin." , "Step C must be finished before step E can begin." , "Step H must be finished before step Z can begin." , "Step W must be finished before step Q can begin." , "Step X must be finished before step E can begin." , "Step G must be finished before step M can begin." , "Step X must be finished before step M can begin." , "Step Y must be finished before step P can begin." , "Step S must be finished before step I can begin." , "Step P must be finished before step X can begin." , "Step S must be finished before step T can begin." , "Step I must be finished before step N can begin." , "Step P must be finished before step L can begin." , "Step C must be finished before step X can begin." , "Step I must be finished before step G can begin." , "Step O must be finished before step F can begin." , "Step I must be finished before step X can begin." , "Step C must be finished before step Z can begin." , "Step B must be finished before step K can begin." , "Step T must be finished before step P can begin." , "Step Q must be finished before step X can begin." , "Step M must be finished before step N can begin." , "Step H must be finished before step O can begin." , "Step Q must be finished before step M can begin." , "Step U must be finished before step F can begin." , "Step Y must be finished before step O can begin." , "Step D must be finished before step O can begin." , "Step R must be finished before step T can begin." , "Step A must be finished before step E can begin." , "Step A must be finished before step M can begin." , "Step C must be finished before step N can begin." , "Step G must be finished before step E can begin." , "Step C must be finished before step Y can begin." , "Step A must be finished before step Z can begin." , "Step S must be finished before step X can begin." , "Step V must be finished before step Z can begin." , "Step Q must be finished before step I can begin." , "Step P must be finished before step E can begin." , "Step D must be finished before step F can begin." , "Step M must be finished before step Z can begin." , "Step U must be finished before step N can begin." , "Step Q must be finished before step L can begin." , "Step O must be finished before step Z can begin." , "Step N must be finished before step E can begin." , "Step S must be finished before step W can begin." , "Step S must be finished before step O can begin." , "Step U must be finished before step T can begin." , "Step A must be finished before step P can begin." , "Step J must be finished before step I can begin." , "Step A must be finished before step F can begin." , "Step U must be finished before step D can begin." , "Step W must be finished before step X can begin." , "Step O must be finished before step L can begin." , "Step J must be finished before step D can begin." , "Step R must be finished before step Z can begin." , "Step O must be finished before step N can begin."];
    let nodes = [];

    input.forEach(line => {
        let start = line.split(" ")[1].charCodeAt() - 65;
        let end = line.split(" ")[7].charCodeAt() - 65;

        if (!nodes[start]) nodes[start] = {'id': start, 'children': [], 'inDeg': 0, 'time' : start + 1 + 60, 'running': false};
        if (!nodes[end]) nodes[end] = {'id': end, 'children': [], 'inDeg': 0, 'time': end + 1 + 60, 'running': false};
        nodes[start].children.push(end);
        nodes[end].inDeg++;
    });

    return nodes;
};

let topSort = (nodes) => {
    let queue = [];
    let res = [];

    Object.keys(nodes).forEach(nodeId => {
        if (nodes[nodeId].inDeg === 0) {
            queue.push(nodes[nodeId]);
        }
    });

    let visitedNodes = 0;

    while (queue.length !== 0) {
        // Make sure we always get the first valid node by alpha
        queue.sort((a, b) => a.id - b.id);
        let node = queue.shift();
        res.push(node.id);

        node.children.forEach(child => {
            nodes[child].inDeg--;
            if (nodes[child].inDeg === 0) {
                queue.push(nodes[child]);
            }
        });

        visitedNodes++;
    }

    if (visitedNodes !== res.length) {
        console.log("cycle detected");
        return;
    }

    res.forEach(node => process.stdout.write(String.fromCharCode(node + 65)));
    let end = new Date().getTime();
    console.log(`\nPart 1 executed in ${end - start} ms`);
}

// part1();
part2();