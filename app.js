// Employee Data Structure for 25-30 August 2025 (Monday to Saturday)
/* ---------- 1. DAY LABELS (Mon-Sat) ---------- */
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/* ---------- 2. EMPLOYEE DATA (Mon-Sat, 25-30 Aug 2025) ---------- */
const employeeData = {
  development: [
    { name: 'Dharmendra Singh', role: 'Tech Lead',
      dailyTasks: [3, 3, 9, 7, 4, 4], totalTasks: 30, color: '#FF5722' },
    { name: 'Homendra Patil', role: 'Senior Software Developer',
      dailyTasks: [6, 2, 9, 7, 5, 10], totalTasks: 39, color: '#FF5722' },
    { name: 'Neha Agarwal', role: 'Senior Software Developer',
      dailyTasks: [6, 14, 9, 6, 10, 10], totalTasks: 55, color: '#FF5722' },
    { name: 'Ajay Marko', role: 'Frontend Developer',
      dailyTasks: [6, 2, 10, 13, 13, 26], totalTasks: 70,
      color: '#FF5722', isTopPerformer: true },
    { name: 'Sudha Sahu', role: 'React Native Developer',
      dailyTasks: [9, 12, 5, 7, 8, 8], totalTasks: 49, color: '#FF5722' }
  ],
  testing: [
    { name: 'Sunil Singh', role: 'Quality Analyst',
      dailyTasks: [32, 1, 58, 33, 31, 12], totalTasks: 139,
      color: '#9C27B0', isTopPerformer: true },
    { name: 'Om Sain', role: 'Quality Analyst',
      dailyTasks: [28, 5, 0, 34, 26, 7], totalTasks: 100,
      color: '#9C27B0', leaveDay: 2, leaveNote: 'On Leave' } // Wed index 2
  ],
  product: [
    { name: 'Abhishek Singh', role: 'Product Manager',
      dailyTasks: [3, 0, 0, 0, 0, 0], totalTasks: 3, color: '#3F51B5' },
    { name: 'Sakshi Bhuwal', role: 'Process Coordinator',
      dailyTasks: [2, 1, 1, 0, 1, 1], totalTasks: 6,
      color: '#3F51B5', leaveDay: 3, leaveNote: 'On Leave',  // Thu index 3
      incompleteDay: 2 }                                     // Wed index 2
  ],
  design: [
    { name: 'Hemant Talole', role: 'UI Designer',
      dailyTasks: [7, 3, 2, 3, 4, 4], totalTasks: 23, color: '#E91E63' }
  ]
};

/* ---------- 3. CEO DATA (Mon-Sat) ---------- */
const ceoData = {
  week: '25 August to 30 August 2025',
  kpis: {
    userGrowth: { trial: 4, paid: 14, conversion: 77.8 },
    revenue:    { weekly: 1652, daily: 55.1, marketingSpend: 150000 },
    marketing:  { spend: 150000, visitors: 59, cac: 0, efficiency: 0 },
    team:       { tasks: 514, productivity: 100 },
    system:     { totalLogins: 32, crmLogins: 1, payrollLogins: 31,
                  tasksLogins: 0, booksLogins: 0 }
  },
  charts: {
    userGrowth: {
      trialUsers: [4, 4, 4, 4, 4, 4],
      paidUsers:  [14,14,14,14,14,14]
    },
    revenue: {
      dailyRevenue:  [55.1,55.1,55.1,55.1,55.1,55.1],
      marketingSpend:[25000,25000,25000,25000,25000,25000]
    },
    /* correct visitor sequence Mon-Sat */
    traffic: { visitors: [7,5,8,7,17,15] },
    conversion: {
      visitors:[7,5,8,7,17,15], leads:[0,0,0,0,0,0], signups:[0,0,0,0,0,0]
    },
    /* department task lines Mon-Sat */
    departments:{
      development:[12,25,39,34,21,25],
      design:     [1,3,12,1,1,3],
      testing:    [18,1,14,2,9,11],
      product:    [3,5,13,3,4,7]
    },
    /* system usage Mon-Sat */
    systemUsage:{
      crm:    [0,0,0,0,1,0],
      payroll:[9,8,1,3,9,1],
      tasks:  [0,0,0,0,0,0],
      books:  [0,0,0,0,0,0]
    },
    productivity:{
      totalTasks:[34,34,78,40,35,46],        // sum of dept tasks each day
      completionRate:[100,100,100,100,100,100]
    }
  }
};

/* ---------- 4. LABEL / COLOR ARRAYS (untouched) ---------- */
const chartColors = [
  '#1FB8CD','#FFC185','#B4413C','#ECEBD5','#5D878F',
  '#DB4545','#D2BA4C','#964325','#944454','#13343B'
];

/* ---------- 5. NOTHING ELSE CHANGED ----------
   The rest of your JS (tab-switch, chart builders, etc.) remains the same.
   Because every chart pulls its Y-values straight from these arrays,
   correcting the arrays is all that’s required to realign the visuals.
------------------------------------------------*/

// Chart instances storage
let chartInstances = {};
let executiveChartsInitialized = false;
let employeeChartsInitialized = false;

// Tab switching functionality
function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Remove active class from all tab contents and hide them
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activate selected tab button
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Initialize charts for the active tab with delay to ensure DOM is ready
    setTimeout(() => {
        if (tabName === 'executive' && !executiveChartsInitialized) {
            initializeCEOCharts();
            executiveChartsInitialized = true;
        } else if (tabName === 'employee' && !employeeChartsInitialized) {
            initializeEmployeeCharts();
            employeeChartsInitialized = true;
        }
    }, 150);
}

// Export chart functionality
function exportChart(chartId) {
    console.log('Exporting chart:', chartId);
    const chart = chartInstances[chartId];
    if (chart) {
        const link = document.createElement('a');
        link.download = `${chartId}-chart.png`;
        link.href = chart.toBase64Image();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        console.error('Chart not found for export:', chartId);
        alert('Chart export failed. Please try again.');
    }
}

// Initialize CEO dashboard charts - 9 business charts total
function initializeCEOCharts() {
    console.log('Initializing CEO charts...');
    try {
        createUserGrowthChart();
        createRevenueMarketingChart();
        createWebsiteTrafficChart();
        createLeadConversionChart();
        createDepartmentPerformanceChart();
        createSystemUsageChart();
        createBusinessOverviewChart();
        createMarketingROIChart();
        createProductivityTrendsChart(); // 9th chart
        console.log('CEO charts initialized successfully');
    } catch (error) {
        console.error('Error initializing CEO charts:', error);
    }
}

// Initialize individual employee charts
function initializeEmployeeCharts() {
    console.log('Initializing employee charts...');
    try {
        // Development team charts
        createEmployeeChart('dharmendraChart', employeeData.development[0]);
        createEmployeeChart('homendraChart', employeeData.development[1]);
        createEmployeeChart('nehaChart', employeeData.development[2]);
        createEmployeeChart('ajayChart', employeeData.development[3]);
        createEmployeeChart('sudhaChart', employeeData.development[4]);
        
        // Testing team charts
        createEmployeeChart('sunilChart', employeeData.testing[0]);
        createEmployeeChart('omChart', employeeData.testing[1]);
        
        // Product team charts
        createEmployeeChart('abhishekChart', employeeData.product[0]);
        createEmployeeChart('sakshiChart', employeeData.product[1]);
        
        // Design team chart
        createEmployeeChart('hemantChart', employeeData.design[0]);
        
        console.log('Employee charts initialized successfully');
    } catch (error) {
        console.error('Error initializing employee charts:', error);
    }
}

// Create individual employee chart with special handling
function createEmployeeChart(canvasId, employee) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.error('Canvas not found:', canvasId);
        return;
    }
    
    // Destroy existing chart if it exists
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    // Create background colors array with special handling for leave days
    const backgroundColors = employee.dailyTasks.map((tasks, index) => {
        if (employee.leaveDay !== undefined && index === employee.leaveDay) {
            return '#666666'; // Gray for leave days
        }
        return employee.color;
    });
    
    const data = {
        labels: dayLabels,
        datasets: [{
            label: 'Tasks Completed',
            data: employee.dailyTasks,
            backgroundColor: backgroundColors,
            borderColor: employee.color,
            borderWidth: 2,
            borderRadius: 4,
            borderSkipped: false,
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const dayIndex = context.dataIndex;
                        let label = `${context.parsed.y} tasks`;
                        
                        // Special handling for leave days
                        if (employee.leaveDay !== undefined && dayIndex === employee.leaveDay) {
                            label += ` (${employee.leaveNote})`;
                        }
                        
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };
    
    try {
        chartInstances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
        console.log('Created chart:', canvasId);
    } catch (error) {
        console.error('Error creating chart:', canvasId, error);
    }
}

// CEO Dashboard Charts (9 total)
function createUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;
    
    if (chartInstances['userGrowthChart']) {
        chartInstances['userGrowthChart'].destroy();
    }
    
    const data = {
        labels: dayLabels,
        datasets: [
            {
                label: 'Paid Users',
                data: ceoData.charts.userGrowth.paidUsers,
                backgroundColor: chartColors[0],
                borderColor: chartColors[0],
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Trial Users',
                data: ceoData.charts.userGrowth.trialUsers,
                backgroundColor: chartColors[1],
                borderColor: chartColors[1],
                borderWidth: 2,
                fill: false
            }
        ]
    };
    
    chartInstances['userGrowthChart'] = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createRevenueMarketingChart() {
    const ctx = document.getElementById('revenueMarketingChart');
    if (!ctx) return;
    
    if (chartInstances['revenueMarketingChart']) {
        chartInstances['revenueMarketingChart'].destroy();
    }
    
    const data = {
        labels: dayLabels,
        datasets: [
            {
                label: 'Daily Revenue (₹)',
                data: ceoData.charts.revenue.dailyRevenue,
                backgroundColor: chartColors[2],
                borderColor: chartColors[2],
                borderWidth: 2,
                yAxisID: 'y'
            },
            {
                label: 'Marketing Spend (₹)',
                data: ceoData.charts.revenue.marketingSpend,
                backgroundColor: chartColors[3],
                borderColor: chartColors[3],
                borderWidth: 2,
                yAxisID: 'y1'
            }
        ]
    };
    
    chartInstances['revenueMarketingChart'] = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            }
        }
    });
}

function createWebsiteTrafficChart() {
    const ctx = document.getElementById('websiteTrafficChart');
    if (!ctx) return;
    
    if (chartInstances['websiteTrafficChart']) {
        chartInstances['websiteTrafficChart'].destroy();
    }
    
    const data = {
        labels: dayLabels,
        datasets: [{
            label: 'Website Visitors',
            data: ceoData.charts.traffic.visitors,
            backgroundColor: chartColors[4],
            borderColor: chartColors[4],
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };
    
    chartInstances['websiteTrafficChart'] = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createLeadConversionChart() {
    const ctx = document.getElementById('leadConversionChart');
    if (!ctx) return;
    
    if (chartInstances['leadConversionChart']) {
        chartInstances['leadConversionChart'].destroy();
    }
    
    const data = {
        labels: ['Visitors', 'Leads', 'Signups'],
        datasets: [{
            label: 'Conversion Funnel',
            data: [57, 0, 0], // Total visitors: 57, Leads: 0, Signups: 0
            backgroundColor: [chartColors[5], chartColors[6], chartColors[7]],
            borderWidth: 2
        }]
    };
    
    chartInstances['leadConversionChart'] = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createDepartmentPerformanceChart() {
    const ctx = document.getElementById('deptPerformanceChart');
    if (!ctx) return;
    
    if (chartInstances['deptPerformanceChart']) {
        chartInstances['deptPerformanceChart'].destroy();
    }
    
    const data = {
        labels: dayLabels,
        datasets: [
            {
                label: 'Development',
                data: ceoData.charts.departments.development,
                backgroundColor: '#FF5722',
                borderColor: '#FF5722',
                borderWidth: 2
            },
            {
                label: 'Testing',
                data: ceoData.charts.departments.testing,
                backgroundColor: '#9C27B0',
                borderColor: '#9C27B0',
                borderWidth: 2
            },
            {
                label: 'Product',
                data: ceoData.charts.departments.product,
                backgroundColor: '#3F51B5',
                borderColor: '#3F51B5',
                borderWidth: 2
            },
            {
                label: 'Design',
                data: ceoData.charts.departments.design,
                backgroundColor: '#E91E63',
                borderColor: '#E91E63',
                borderWidth: 2
            }
        ]
    };
    
    chartInstances['deptPerformanceChart'] = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createSystemUsageChart() {
    const ctx = document.getElementById('systemUsageChart');
    if (!ctx) return;
    
    if (chartInstances['systemUsageChart']) {
        chartInstances['systemUsageChart'].destroy();
    }
    
    const data = {
        labels: dayLabels,
        datasets: [
            {
                label: 'CRM',
                data: ceoData.charts.systemUsage.crm,
                backgroundColor: chartColors[8],
                borderColor: chartColors[8],
                borderWidth: 2
            },
            {
                label: 'Payroll',
                data: ceoData.charts.systemUsage.payroll,
                backgroundColor: chartColors[9],
                borderColor: chartColors[9],
                borderWidth: 2
            },
            {
                label: 'Tasks',
                data: ceoData.charts.systemUsage.tasks,
                backgroundColor: chartColors[0],
                borderColor: chartColors[0],
                borderWidth: 2
            },
            {
                label: 'Books',
                data: ceoData.charts.systemUsage.books,
                backgroundColor: chartColors[1],
                borderColor: chartColors[1],
                borderWidth: 2
            }
        ]
    };
    
    chartInstances['systemUsageChart'] = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            }
        }
    });
}

function createBusinessOverviewChart() {
    const ctx = document.getElementById('businessOverviewChart');
    if (!ctx) return;
    
    if (chartInstances['businessOverviewChart']) {
        chartInstances['businessOverviewChart'].destroy();
    }
    
    const data = {
        labels: ['Revenue', 'Users', 'Tasks', 'Visitors'],
        datasets: [{
            label: 'Business Metrics',
            data: [1652, 18, 514, 57],
            backgroundColor: [chartColors[2], chartColors[3], chartColors[4], chartColors[5]],
            borderWidth: 2
        }]
    };
    
    chartInstances['businessOverviewChart'] = new Chart(ctx, {
        type: 'polarArea',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createMarketingROIChart() {
    const ctx = document.getElementById('marketingROIChart');
    if (!ctx) return;
    
    if (chartInstances['marketingROIChart']) {
        chartInstances['marketingROIChart'].destroy();
    }
    
    const data = {
        labels: ['Marketing Spend', 'Revenue Generated', 'ROI'],
        datasets: [{
            data: [150000, 1652, -148348], // Negative ROI
            backgroundColor: [chartColors[6], chartColors[7], chartColors[8]],
            borderWidth: 2
        }]
    };
    
    chartInstances['marketingROIChart'] = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            if (context.dataIndex === 2) {
                                return `ROI: ₹${value.toLocaleString()}`;
                            }
                            return `${context.label}: ₹${value.toLocaleString()}`;
                        }
                    }
                }
            }
        }
    });
}

function createProductivityTrendsChart() {
    const ctx = document.getElementById('productivityTrendsChart');
    if (!ctx) return;
    
    if (chartInstances['productivityTrendsChart']) {
        chartInstances['productivityTrendsChart'].destroy();
    }
    
    const data = {
        labels: dayLabels,
        datasets: [
            {
                label: 'Total Tasks',
                data: ceoData.charts.productivity.totalTasks,
                backgroundColor: chartColors[9],
                borderColor: chartColors[9],
                borderWidth: 2,
                yAxisID: 'y'
            },
            {
                label: 'Completion Rate (%)',
                data: ceoData.charts.productivity.completionRate,
                backgroundColor: chartColors[0],
                borderColor: chartColors[0],
                borderWidth: 2,
                type: 'line',
                yAxisID: 'y1'
            }
        ]
    };
    
    chartInstances['productivityTrendsChart'] = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tasks'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Completion Rate (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            }
        }
    });
}

// Week selector functionality
function handleWeekChange() {
    const selectedWeek = document.getElementById('weekSelect').value;
    console.log('Week changed to:', selectedWeek);
    
    // Show feedback to user
    const weekSelect = document.getElementById('weekSelect');
    const originalBg = weekSelect.style.backgroundColor;
    weekSelect.style.backgroundColor = 'var(--color-secondary)';
    setTimeout(() => {
        weekSelect.style.backgroundColor = originalBg;
    }, 300);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing dashboard...');
    
    // Set up week selector
    const weekSelect = document.getElementById('weekSelect');
    if (weekSelect) {
        weekSelect.addEventListener('change', handleWeekChange);
        console.log('Week selector initialized');
    }
    
    // Set up tab buttons with direct event listeners
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            console.log('Tab button clicked:', tabName);
            switchTab(tabName);
        });
    });
    
    // Initialize the default tab (CEO Dashboard) with delay
    setTimeout(() => {
        console.log('Setting initial tab...');
        switchTab('executive');
    }, 200);
    
    console.log('Dashboard initialization complete');
});

// Make functions globally available for onclick handlers
window.switchTab = switchTab;
window.exportChart = exportChart;
