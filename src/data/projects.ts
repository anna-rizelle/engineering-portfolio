import type { Project } from './types'

// ADD A NEW PROJECT: copy one of the entries below, paste it at the end of the
// list, and change the fields. Leave out any optional field you have nothing for;
// that section then disappears from the project page.
//
// IMPORTANT: these four are starter examples marked "planned". They contain no
// results and claim no tools. Update status and tools only when they are true.
//
// Anything in [square brackets] is a placeholder: it shows as an orange tag in
// `npm run dev` and is hidden from the public site.

export const projects: Project[] = [
  {
    id: 'proj-airfoil-cfd',
    slug: 'airfoil-cfd-investigation',
    title: 'Aerodynamics & CFD Investigation',
    shortDescription:
      'Planned study of how airfoil geometry and angle of attack affect pressure distribution, lift, and drag, checked against analytical estimates or published data.',
    category: 'aero-cfd',
    status: 'planned',
    tools: [], // add only tools you have actually used, e.g. 'Python'
    featured: true,
    isExample: true,

    objectives: [
      'Determine how changing airfoil geometry affects pressure distribution',
      'Examine how angle of attack influences lift and drag',
      'Assess how mesh resolution and boundary conditions affect the solution',
      'Compare results with analytical estimates or published experimental data',
      '[Add measurable targets once they are known]',
    ],
    constraints: ['[Add constraints: geometry, computational resources, operating conditions]'],

    // Standard, textbook relationships. Keep the ones this project really uses.
    theory: {
      intro: '[Add a short note on which relationships apply to your analysis]',
      equations: [
        {
          label: 'Continuity (incompressible flow)',
          latex: '\\nabla \\cdot \\mathbf{u} = 0',
          note: 'Mass conservation for a fluid of constant density.',
        },
        {
          label: 'Momentum (incompressible Navier-Stokes)',
          latex:
            '\\rho\\left(\\frac{\\partial \\mathbf{u}}{\\partial t} + \\mathbf{u}\\cdot\\nabla\\mathbf{u}\\right) = -\\nabla p + \\mu\\nabla^{2}\\mathbf{u} + \\mathbf{f}',
        },
        {
          label: 'Reynolds number',
          latex: 'Re = \\frac{\\rho V c}{\\mu}',
          note: 'Ratio of inertial to viscous forces; c is a characteristic length such as the chord.',
        },
        {
          label: 'Pressure coefficient',
          latex: 'C_p = \\frac{p - p_\\infty}{\\tfrac{1}{2}\\rho V_\\infty^{2}}',
        },
        {
          label: 'Section lift coefficient',
          latex: 'c_l = \\frac{l}{\\tfrac{1}{2}\\rho V_\\infty^{2} c}',
          note: 'l is the lift per unit span.',
        },
        {
          label: 'Section drag coefficient',
          latex: 'c_d = \\frac{d}{\\tfrac{1}{2}\\rho V_\\infty^{2} c}',
          note: 'd is the drag per unit span.',
        },
      ],
      assumptions: ['[Add the assumptions for your chosen flow conditions]'],
    },

    // These describe the INTENDED approach, so the page labels them "Planned workflow".
    methodology: [
      { title: 'Research', description: 'Review published airfoil data and choose a reference case to compare against.' },
      { title: 'Geometry', description: 'Define the airfoil geometry in CAD.' },
      { title: 'Analytical estimate', description: 'Estimate lift and drag behavior from theory before running any simulation.' },
      { title: 'Simulation setup', description: 'Set up the computational domain, mesh, and boundary conditions.' },
      { title: 'Verification', description: 'Check mesh sensitivity and compare against the reference data.' },
      { title: 'Documentation', description: 'Record assumptions, results, and limitations.' },
    ],

    // Only 'planned' until the check has actually been done.
    validation: [
      { method: 'Hand calculation or analytical estimate', status: 'planned' },
      { method: 'Mesh-independence study', status: 'planned' },
      { method: 'Comparison with published benchmark data', status: 'planned' },
    ],

    // Example entries that only show in development. Replace with real ones.
    images: [
      {
        src: 'images/placeholder-figure.svg',
        alt: 'Placeholder figure',
        caption: '[Replace with a real geometry, mesh, or contour image. Explain what it shows and why it matters.]',
        placeholder: true,
      },
      {
        src: 'images/placeholder-figure.svg',
        alt: 'Placeholder figure',
        caption: '[Add a second image, for example a pressure plot or a free-body diagram.]',
        placeholder: true,
      },
    ],
    results: [
      {
        title: '[Add result title]',
        kind: 'simulation',
        description: '[Insert verified simulation result]',
        table: {
          headers: ['Case', 'Metric', 'Value'],
          rows: [['[Case]', '[Metric]', '[Value]']],
        },
        significance: '[Explain why this result matters]',
        placeholder: true,
      },
    ],

    links: [{ label: 'GitHub repository', url: '[Link GitHub repository]' }],
  },
  {
    id: 'proj-autonomous-drone',
    slug: 'autonomous-drone',
    title: 'Autonomous Drone Development',
    shortDescription:
      'Planned design and development of an autonomous drone system, covering hardware, flight control, and navigation software.',
    category: 'autonomous',
    status: 'planned',
    tools: [],
    featured: true,
    isExample: true,
  },
  {
    id: 'proj-propulsion-structures',
    slug: 'propulsion-structures-project',
    title: 'Rocketry, Propulsion & Structures',
    shortDescription:
      'Planned project on propulsion calculations, structural design, or composite materials for an aerospace system.',
    category: 'aerospace-rocketry',
    status: 'planned',
    tools: [],
    featured: true,
    isExample: true,
  },
  {
    id: 'proj-analysis-tool',
    slug: 'engineering-analysis-tool',
    title: 'Engineering Analysis Tool',
    shortDescription:
      'Planned small software tool that automates part of an engineering workflow, such as a Reynolds number and flow-regime calculator.',
    category: 'software-tools',
    status: 'planned',
    tools: [],
    featured: true,
    isExample: true,
  },
]
