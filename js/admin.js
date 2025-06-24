// Initialize map
let map;
let markers = [];
let reportedBins = new Map();

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    map = L.map('map').setView([ 6.676119792911762, -1.5694570541381838], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© Modified by Rashid and Hafiz'
}).addTo(map);

    // Load initial data
    loadBins();
   
    // Set up event listeners
    setupEventListeners();
});

// Load all bins from the server
function loadBins() {
    // This would typically be an API call
    const mockBins = [
        { id: 'BIN001', lat:  6.6745, lng: -1.56549, status: 'empty' },
        { id: 'BIN002', lat:  6.6744, lng: -1.56572, status: 'full' },
        { id: 'BIN003', lat:  6.6741, lng: -1.56572, status: 'empty' },
        { id: 'BIN004', lat:  6.6739, lng: -1.5654, status: 'full' },
        { id: 'BIN005', lat:  6.6741, lng: -1.56518, status: 'full' },
        { id: 'BIN006', lat: 6.6742, lng: -1.56548, status: 'empty' },
        { id: 'BIN007', lat: 6.6736, lng: -1.56496, status: 'full' },
        { id: 'BIN008', lat: 6.6736, lng: -1.56469, status: 'empty' },
        { id: 'BIN009', lat: 6.6733, lng: -1.56473, status: 'full' },
        { id: 'BIN010', lat: 6.6729, lng: -1.56482, status: 'empty' },
        { id: 'BIN011', lat: 6.6726, lng: -1.56554, status: 'full' },
        { id: 'BIN012', lat: 6.6725, lng: -1.56675, status: 'empty' },
        { id: 'BIN013', lat: 6.6726, lng: -1.56743, status: 'full' },
        { id: 'BIN014', lat: 6.672, lng: -1.56756, status: 'empty' },
        { id: 'BIN015', lat: 6.6727, lng: -1.56761, status: 'full' },
        { id: 'BIN016', lat: 6.6732, lng: -1.56765, status: 'empty' },
        { id: 'BIN017', lat: 6.6739, lng: -1.56774, status: 'full' },
        { id: 'BIN018', lat: 6.6743, lng: -1.56765, status: 'empty' },
        { id: 'BIN019', lat: 6.6746, lng: -1.56761, status: 'full' },
        { id: 'BIN020', lat: 6.6749, lng: -1.56792, status: 'empty' },
        { id: 'BIN021', lat: 6.6755, lng: -1.56747, status: 'full' },
        { id: 'BIN022', lat: 6.6752, lng: -1.56734, status: 'empty' },
        { id: 'BIN023', lat: 6.6749, lng: -1.56653, status: 'full' },
        { id: 'BIN024', lat: 6.6763, lng: -1.56729, status: 'empty' },
        { id: 'BIN025', lat: 6.6771, lng: -1.56707, status: 'full' },
        { id: 'BIN026', lat: 6.6774, lng: -1.56725, status: 'empty' },
        { id: 'BIN027', lat: 6.6787, lng: -1.57026, status: 'full' },
        { id: 'BIN028', lat: 6.6825, lng: -1.57147, status: 'empty' },
        { id: 'BIN029', lat: 6.6825, lng: -1.57192, status: 'full' },
        { id: 'BIN030', lat: 6.682, lng: -1.57219, status: 'empty' },
        { id: 'BIN031', lat: 6.679, lng: -1.57237, status: 'full' },
        { id: 'BIN032', lat: 6.6792, lng: -1.57273, status: 'empty' },
        { id: 'BIN033', lat: 6.6772, lng: -1.57241, status: 'full' },
        { id: 'BIN034', lat: 6.677, lng: -1.57273, status: 'empty' },
        { id: 'BIN035', lat: 6.6764, lng: -1.57237, status: 'full' }
      
    ];

    mockBins.forEach(bin => {
        addBinMarker(bin);
    });
}

// Add a bin marker to the map
function addBinMarker(bin) {
    const marker = L.marker([bin.lat, bin.lng])
        .bindPopup(`
            <strong>Bin ID: ${bin.id}</strong><br>
            Status: ${bin.status}<br>
            <button onclick="showScheduleModal('${bin.id}')">Schedule Pickup</button>
        `);

    if (bin.status === 'full') {
        marker.setIcon(L.divIcon({
            className: 'bin-marker full',
            // html: '<i class="fas fa-trash"></i>',
            html: '<div style="width: 20px; height: 20px; background: #F44336; border-radius: 50%; border: 2px solid white;"></div>',
            iconSize: [20, 20]
        }));
    }

 else {
    marker.setIcon(L.divIcon({
        className: 'bin-marker empty',
        html: '<div style="width: 20px; height: 20px; background: #4CAF50; border-radius: 50%; border: 2px solid white;"></div>',
        iconSize: [20, 20]
    })
        )
 };

    markers.push({ marker, bin });
    marker.addTo(map);
}

// Show schedule modal
function showScheduleModal(binId) {
    const modal = document.getElementById('scheduleModal');
    const binIdInput = document.getElementById('binId');
    binIdInput.value = binId;
    modal.style.display = 'block';
}


// Set up event listeners
function setupEventListeners() {
    // Show/Hide full bins
    document.getElementById('showFullBins').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('showAllBins').classList.remove('active');

         //Go through every item in the markers array, and for each one, 
         //pull out the marker and bin properties so I can work with them directly.

        markers.forEach(({ marker, bin }) => {
            if (bin.status === 'full') {
                
                marker.setOpacity(1);
            } else {
    
                marker.setOpacity(0.3);
            }
        });
    });

    document.getElementById('showAllBins').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('showFullBins').classList.remove('active');

        markers.forEach(({ marker }) => {
            
          marker.setOpacity(1);
        });
    });

    // Schedule modal
    const modal = document.getElementById('scheduleModal');
    const closeBtn = modal.querySelector('.close');
    const scheduleForm = document.getElementById('scheduleForm');


    //When the close button (closeBtn) is clicked, hide the modal by setting its display style to none.
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };


    //If the user clicks anywhere on the screen (window) and what they clicked was the modal background itself (not inside the popup), then also hide the modal.
    //.target is one of its properties. It tells you exactly which HTML element was clicked or interacted with.
    // modal: the HTML element that represents your modal's background overlay (the full-screen gray or transparent background behind the popup content).
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };



  //  This attaches a handler for when the form is submitted.
  //  Prevents the form from doing its default action (i.e., refreshing the page).
  //  These lines grab values from the form inputs:
  //  Sends the info to the console (in real apps, this would be an API call to the backend to actually save the schedule).
  
  scheduleForm.onsubmit = function(e) {
        e.preventDefault();
        const binId = document.getElementById('binId').value;
        const date = document.getElementById('pickupDate').value;
        const time = document.getElementById('pickupTime').value;
        const notes = document.getElementById('notes').value;

        // This would typically be an API call
        console.log('Scheduling pickup:', { binId, date, time, notes });
        
       
    };

    
}

  