# Marketer Weather App

Task
Set up a simple weather application where you can search for a city and have the
weather presented visually. The sketch illustrates basic functionality, but you can
be creative or add more if you'd like.

#Project Requirements:
Build System (Webpack/NPM/Yarn): 
✅ I've used Vite with npm). I chose Vite since it's is efficient, popular, and well-suited for modern React apps. I was tempted to go with NextJS but I thought it was a bit overkill since it didn't need page navigation, excessive load screens etc.

Frontend/UI Framework with React:
✅ Like mentioned above, built with React since I thought NextJS was overkill. I chose not to use component libraries because I thought they wouldn't add anything special and didn't need any particularly difficult to build components.

Weather API Integration:

✅ The app fetches data from OpenWeather using regular fetch requests and also React Query.

Responsiveness for Larger/Smaller Screens:
✅ The app is responsive, adjusting for mobile and desktop views with Tailwind classes. The content adjusts to screens with grid layouts.

Hosted Online:
✅ The app is deployed on Vercel and accessible on https://weather-app-rodjxcs-projects.vercel.app/

Unit and Integration Specs:
✅ Tests are implemented with Vitest and Testing Library. There's a function test for getHumidityValue and component tests for Forecast 

#UX Requirements:
Autocomplete Search for Cities with Error Handling:

✅ Autocomplete feature is implemented, doing a query for each "onChange". Error handling is present on wrong request and only valid suggestions are selectable, so the user can't submit empty queries or "jibberish" querys, because the autocomplete is the "onSubmit" and what triggers the request. Also better for accessibility since we reduce the need for the user to click twice (once when they select the location, and once to trigger the onSubmit.

List of Recently Searched Cities with Weather/Temperature:
✅ The recent searches feature is implemented, allowing users to view their past searches in the Forecast component, and in they wish to "to back" to the main screen.

Default Weather and Temperature Based on Current Location:
✅ The app fetches the user’s current location for an initial weather display, with a fallback if location services are disabled.

Visual Display of Search Results with Temperature:
✅ Search results are displayed with most of the relevant data that the API returns.

#Criteria for Consideration:

Best Practice for Code Structure:
✅ Organized by uses and types of components. Centralized all the API requests as custom hooks that then are passed as props to the components that use them. 

Use of New Features and Libraries:
✅ Used React Query for the main weatherFetch hook, but since every search we need to do a new query. Like mentioned above, I didn't think adding component libraries would simplify anything from the code that I couldn't do directly based on the requested functionality. Same with the use of NextJS.

Best Practice for Accessibility:
✅ Accessibility improvements were added, including aria-labels, alt text, and aria-hidden attributes where needed. 

Ability to Spot/Add Important Elements/States:
✅ Included indicators for loading, placeholder states, and error handling in autocomplete. The addition of recent searches and responsive handling also adds depth to the app’s usability.

Creativity in Interaction and Visualization:
✅ Tried my best :D. Tried to make the app as "usable" as possible having the user in mind and how I'd expect an app like that to interact, especially in terms of where to render items, information provided, as well as the autocomplete function/search button. 
