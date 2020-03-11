window.d3VizInits.push(() => quine("effortScalar"));

// We can model technical debt and income as linear scalar on effort
// with extra work put in to make the environment better having a cost of
// one effort. Work doesn't just produce value, it also changes the
// environment.
let acquisitionCost = (focus) => (focus >= 0 ? 1 : 0);

let work = (env, effort, focus) => [
  env * effort - acquisitionCost(focus), // work accomplished
  env + env * effort * focus             // environmental change
];

function simulation(timesteps, focus) {
  var totalAccomplishment = 0,
      workAccomplished = 0,
      accomplishments = [],
      environment = 1;

  for (var i=0; i < timesteps; i++) {
      [workAccomplished, environment] = work(environment, 1, focus);
      totalAccomplishment += workAccomplished;
      accomplishments.push(totalAccomplishment);
  }

  return accomplishments;
}

function createChartData(timesteps) {
  var effort = Array(...range(0, timesteps, 1));

  let hasty = -0.1;
  let diligent = 0.1;
  var effortScalars = Array(...range(hasty, diligent, 0.01));

  return effortScalars.map((scalar) => ({
      control: {
        points: [scalar],
        extent: [hasty, diligent],
        xLabel: "Effort Scalar"
      },
      result: {
        xLabel: "Effort",
        yLabel: "Accomplishment",
        xs: effort,
        ys: simulation(timesteps, scalar)
      }
    }));
}

let visualizations= [
   ["#effortToAccomplishmentChartShortTimeFrame", 10],
   ["#effortToAccomplishmentChartLongTimeFrame", 100]
].map((params) =>
  function() {
    var [selector, timesteps] = params;
    var sGraphic = numberLineControlledLineChart(selector)
      .data(createChartData(timesteps))
      .animate();
  }
);

window.d3VizInits.push.apply(window.d3VizInits, visualizations);
