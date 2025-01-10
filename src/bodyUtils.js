
function onBodyLoad() {
    console.log('onBodyLoad');

    // Near entry of your product, init Mixpanel
    mixpanel.init("92844ab65e3198433160cdea16d2161c", {
        debug: true,
        track_pageview: true,
        persistence: "localStorage",
    });


    mixpanel.identify('youflixqa')

mixpanel.people.set({ '$name': 'Jane Doe',
                      '$email': 'jane.doe@example.com',
'plan' : 'Premium'
// Add anything else about the user here
});


mixpanel.track('Sign Up', {
    'Signup Type': 'Referral'
  })
}

function registerBodyOnload() {
    console.log('registerBodyOnload');
    document.addEventListener('DOMContentLoaded', onBodyLoad);
}




export { registerBodyOnload };