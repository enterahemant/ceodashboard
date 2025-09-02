// Employee Data Structure - CORRECTED for Monday-Saturday (25-30 Aug 2025)
const employeeData = {
    development: [
        {
            name: "Dharmendra Singh",
            role: "Tech Lead",
            dailyTasks: [3, 3, 9, 7, 4, 4], // Mon-Sat (25-30 Aug)
            totalTasks: 30,
            color: '#FF5722'
        },
        {
            name: "Homendra Patil", 
            role: "Senior Software Developer",
            dailyTasks: [6, 2, 9, 7, 5, 10], // Mon-Sat
            totalTasks: 39,
            color: '#FF5722'
        },
        {
            name: "Neha Agarwal",
            role: "Senior Software Developer", 
            dailyTasks: [6, 14, 9, 6, 10, 10], // Mon-Sat
            totalTasks: 55,
            color: '#FF5722'
        },
        {
            name: "Ajay Marko",
            role: "Frontend Developer",
            dailyTasks: [6, 2, 10, 13, 13, 26], // Mon-Sat
            totalTasks: 70,
            color: '#FF5722',
            isTopPerformer: true
        },
        {
            name: "Sudha Sahu",
            role: "React Native Developer",
            dailyTasks: [9, 12, 5, 7, 8, 8], // Mon-Sat
            totalTasks: 49,
            color: '#FF5722'
        }
    ],
    testing: [
        {
            name: "Sunil Singh",
            role: "Quality Analyst",
            dailyTasks: [32, 1, 58, 33, 31, 12], // Mon-Sat
            totalTasks: 139,
            color: '#9C27B0',
            isTopPerformer: true
        },
        {
            name: "Om Sain", 
            role: "Quality Analyst",
            dailyTasks: [28, 5, 0, 34, 26, 7], // Mon-Sat, Wednesday = 0 (leave)
            totalTasks: 100,
            color: '#9C27B0',
            leaveDay: 2, // Wednesday (0-indexed: Mon=0, Tue=1, Wed=2)
            leaveNote: "On Leave"
        }
    ],
    product: [
        {
            name: "Abhishek Singh",
            role: "Product Manager", 
            dailyTasks: [3, 0, 0, 0, 0, 0], // Mon-Sat, only worked Monday
            totalTasks: 3,
            color: '#3F51B5'
        },
        {
            name: "Sakshi Bhuwal",
            role: "Process Coordinator",
            dailyTasks: [2, 1, 1, 0, 1, 1], // Mon-Sat, Thursday = 0 (leave), Wed = incomplete
            totalTasks: 6,
            color: '#3F51B5', 
            leaveDay: 3, // Thursday (0-indexed: Mon=0, Tue=1, Wed=2, Thu=3)
            leaveNote: "On Leave",
            incompleteDay: 2 // Wednesday had incomplete task (1 of 3)
        }
    ],
    design: [
        {
            name: "Hemant Talole",
            role: "UI Designer",
            dailyTasks: [7, 3, 2, 3, 4, 4], // Mon-Sat
            totalTasks: 23,
            color: '#E91E63'
        }
    ]
};

// CORRECTED: Monday-Saturday labels
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayDates = ['25 Aug', '26 Aug', '27 Aug', '28 Aug', '29 Aug', '30 Aug'];
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Chart instances storage
let chartInstances = {};
let executiveChartsInitialized = false;
let employeeChartsInitialized = false;

// Tab switching functionality
function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Hide all tab contents
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.style.display = 'block';
    }
    
    // Update tab buttons
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Initialize charts for the active tab
    setTimeout(() => {
        if (tabName === 'executive' && !executiveChartsInitialized) {
            initializeExecutiveCharts();
            executiveChartsInitialized = true;
        } else if (tabName === 'employee' && !employeeChartsInitialized) {
            initializeEmployeeCharts();
            employeeChartsInitialized = true;
        }
    }, 100);
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

// Initialize executive summary charts
function initializeExecutiveCharts() {
    console.log('Initializing executive charts...');
    try {
        createDepartmentDistributionChart();
        createDailyPerformanceChart();
        createDevelopmentTeamChart();
        createTestingTeamChart();
        createTopPerformersChart();
        createWeeklyTrendChart();
        createCompletionRateChart();
        createEfficiencyChart();
        console.log('Executive charts initialized successfully');
    } catch (error) {
        console.error('Error initializing executive charts:', error);
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

// Create individual employee chart
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
    
    // Prepare background colors for bars (gray for leave days)
    const backgroundColors = employee.dailyTasks.map((tasks, index) => {
        if (employee.leaveDay === index) {
            return '#666666'; // Gray for leave day
        }
        if (employee.incompleteDay === index) {
            return employee.color + '80'; // Lighter shade for incomplete
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
                    title: function(tooltipItems) {
                        const dayIndex = tooltipItems[0].dataIndex;
                        return `${dayLabels[dayIndex]} (${dayDates[dayIndex]})`;
                    },
                    label: function(context) {
                        const dayIndex = context.dataIndex;
                        let label = `${context.parsed.y} tasks`;
                        return label;
                    },
                    afterLabel: function(context) {
                        const dayIndex = context.dataIndex;
                        if (employee.leaveDay === dayIndex) {
                            return employee.leaveNote || 'On Leave';
                        }
                        if (employee.incompleteDay === dayIndex) {
                            return 'Incomplete: 1 of 3 tasks completed';
                        }
                        return '';
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
                },
                title: {
                    display: true,
                    text: 'Tasks Completed'
                }
            },
            x: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Days (25-30 August 2025)'
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

// Executive Summary Charts
function createDepartmentDistributionChart() {
    const ctx = document.getElementById('deptDistChart');
    if (!ctx) return;
    
    if (chartInstances['deptDistChart']) {
        chartInstances['deptDistChart'].destroy();
    }
    
    const data = {
        labels: ['Development', 'Testing', 'Product', 'Design'],
        datasets: [{
            data: [243, 239, 9, 23],
            backgroundColor: ['#FF5722', '#9C27B0', '#3F51B5', '#E91E63'],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };
    
    chartInstances['deptDistChart'] = new Chart(ctx, {
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

function createDailyPerformanceChart() {
    const ctx = document.getElementById('dailyPerfChart');
    if (!ctx) return;
    
    if (chartInstances['dailyPerfChart']) {
        chartInstances['dailyPerfChart'].destroy();
    }
    
    // Calculate daily totals across all employees
    const dailyTotals = dayLabels.map((_, dayIndex) => {
        let total = 0;
        Object.values(employeeData).forEach(dept => {
            dept.forEach(employee => {
                total += employee.dailyTasks[dayIndex];
            });
        });
        return total;
    });
    
    const data = {
        labels: dayLabels,
        datasets: [{
            label: 'Total Tasks',
            data: dailyTotals,
            backgroundColor: chartColors[0],
            borderColor: chartColors[0],
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };
    
    chartInstances['dailyPerfChart'] = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            const dayIndex = tooltipItems[0].dataIndex;
                            return `${dayLabels[dayIndex]} (${dayDates[dayIndex]})`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Tasks'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '25-30 August 2025'
                    }
                }
            }
        }
    });
}

function createDevelopmentTeamChart() {
    const ctx = document.getElementById('devTeamChart');
    if (!ctx) return;
    
    if (chartInstances['devTeamChart']) {
        chartInstances['devTeamChart'].destroy();
    }
    
    const data = {
        labels: employeeData.development.map(emp => emp.name.split(' ')[0]),
        datasets: [{
            label: 'Tasks Completed',
            data: employeeData.development.map(emp => emp.totalTasks),
            backgroundColor: chartColors.slice(0, 5),
            borderWidth: 2,
            borderRadius: 4
        }]
    };
    
    chartInstances['devTeamChart'] = new Chart(ctx, {
        type: 'bar',
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

function createTestingTeamChart() {
    const ctx = document.getElementById('testTeamChart');
    if (!ctx) return;
    
    if (chartInstances['testTeamChart']) {
        chartInstances['testTeamChart'].destroy();
    }
    
    const data = {
        labels: employeeData.testing.map(emp => emp.name.split(' ')[0]),
        datasets: [{
            label: 'Tasks Completed',
            data: employeeData.testing.map(emp => emp.totalTasks),
            backgroundColor: ['#9C27B0', '#BA68C8'],
            borderWidth: 2,
            borderRadius: 4
        }]
    };
    
    chartInstances['testTeamChart'] = new Chart(ctx, {
        type: 'bar',
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

function createTopPerformersChart() {
    const ctx = document.getElementById('topPerfChart');
    if (!ctx) return;
    
    if (chartInstances['topPerfChart']) {
        chartInstances['topPerfChart'].destroy();
    }
    
    // Get all employees and sort by total completed
    const allEmployees = [];
    Object.values(employeeData).forEach(dept => {
        allEmployees.push(...dept);
    });
    allEmployees.sort((a, b) => b.totalTasks - a.totalTasks);
    const top5 = allEmployees.slice(0, 5);
    
    const data = {
        labels: top5.map(emp => emp.name.split(' ')[0]),
        datasets: [{
            label: 'Tasks Completed',
            data: top5.map(emp => emp.totalTasks),
            backgroundColor: chartColors.slice(0, 5),
            borderWidth: 2,
            borderRadius: 4
        }]
    };
    
    chartInstances['topPerfChart'] = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createWeeklyTrendChart() {
    const ctx = document.getElementById('weeklyTrendChart');
    if (!ctx) return;
    
    if (chartInstances['weeklyTrendChart']) {
        chartInstances['weeklyTrendChart'].destroy();
    }
    
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Current Week (25-30 Aug)'],
        datasets: [{
            label: 'Total Tasks',
            data: [480, 495, 502, 514],
            backgroundColor: chartColors[0],
            borderColor: chartColors[0],
            borderWidth: 2,
            fill: false,
            tension: 0.4
        }]
    };
    
    chartInstances['weeklyTrendChart'] = new Chart(ctx, {
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
                    beginAtZero: false
                }
            }
        }
    });
}

function createCompletionRateChart() {
    const ctx = document.getElementById('completionChart');
    if (!ctx) return;
    
    if (chartInstances['completionChart']) {
        chartInstances['completionChart'].destroy();
    }
    
    const data = {
        labels: ['Development', 'Testing', 'Product', 'Design'],
        datasets: [{
            label: 'Completion Rate',
            data: [100, 100, 100, 100],
            backgroundColor: ['#4CAF50', '#4CAF50', '#4CAF50', '#4CAF50'],
            borderWidth: 2,
            borderRadius: 4
        }]
    };
    
    chartInstances['completionChart'] = new Chart(ctx, {
        type: 'bar',
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
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function createEfficiencyChart() {
    const ctx = document.getElementById('efficiencyChart');
    if (!ctx) return;
    
    if (chartInstances['efficiencyChart']) {
        chartInstances['efficiencyChart'].destroy();
    }
    
    const data = {
        labels: ['Development', 'Testing', 'Product', 'Design'],
        datasets: [{
            data: [48.6, 119.5, 4.5, 23],
            backgroundColor: ['#FF5722', '#9C27B0', '#3F51B5', '#E91E63'],
            borderWidth: 2
        }]
    };
    
    chartInstances['efficiencyChart'] = new Chart(ctx, {
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
    
    // In a real application, this would update all charts with new data
    // For now, just log the change
    alert(`Week filter changed to: ${weekSelect.options[weekSelect.selectedIndex].text}`);
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
    
    // Set up tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Initialize the default tab (Executive Summary)
    setTimeout(() => {
        switchTab('executive');
    }, 100);
    
    console.log('Dashboard initialization complete');
});

// Make functions globally available
window.switchTab = switchTab;
window.exportChart = exportChart;