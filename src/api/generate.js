"use server";
import {geminiService, generateGeminiRequest} from "../../controllers/geminiService";

export async function generate(prompt) {
    const Question = `Return JSON file.This is an app that creates itineraries for travelers and makes them a perfect travelling schedule.
    The questions that are being asked from the user are:
    1. Where are you traveling to?
    2. Dates of stay?
    3. Where are you going to stay?
    4. Start and end time of schedule for the day?
    5. How do you like to move around?
    6. List down any specific locations/spots you want to visit?
    7. Do you like to do active or chill activities?
    8. Are you interested by history, art, etc?
    9. What is your daily budget?
    10. Are you by yourself or with other people?
    11. What type of food you prefer?
    Here are the users answers:
    `+
    "1: " + prompt.destination + "\n" +
    "2: " + prompt.dates + "\n" +
    "3: " + prompt.area + "\n" +
    "4: " + prompt.time + "\n" +
    "5: " + prompt.transport + "\n" +
    "6: " + prompt.hobbies + "\n" +
    "7: " + prompt.activityPreference + "\n" +
    "8: " + prompt.interests + "\n" +
    "9: " + prompt.budget + "\n" +
    "10: " + prompt.company + "\n" +
    "11: " + prompt.food + "\n" +
    `The JSON formatting you must follow, this is just a sample:
    {
      '02/05/24': [
        {
          'activity': 'Subway',
          'startTime': '08:00',
          'endTime': '08:45',
          'description': 'Take the subway from the place of stay to the first site, detailing the station names and line.',
          'cost': 2.75
        },
        {
          'activity': 'Museum of MoMa',
          'startTime': '08:45',
          'endTime': '10:00',
          'description': 'Explore the history and collections at the museum, located at [museum address].',
          'cost': 15
        },
        {
          'activity': 'Walk',
          'startTime': '10:00',
          'endTime': '12:30',
          'description': 'Head north towards [street], turn on [street] //continue in the same fashion describing directions to the user',
          'cost': 0
        },
        {
          'activity': 'Empire State Building',
          'startTime': '12:30',
          'endTime': '2:00',
          'description': 'Explore the history and collections at the museum, located at [museum address].',
          'cost': 38
        }
        //Continue the pattern until there is only enough time left for the user to come back home
      ],
      '02/06/24': [
        // Repeat the format for subsequent days
      ]
    }
    
    19 Rules you must follow:
    1. Include a lunch if necessary and make sure it fits with the users preference, here is the users preference in food: ` + prompt.food +
    `
    2.Include at least 3 activities each day not including the transits
    3. Alternate between activities and transit, excluding when several transits are needed to get to the next activity
    4. Some transits may include several steps such as walk-subway-walk, separate them into several transits
    5. Make sure to include bus number, train line and etc.
    6. If the user travels by car include the directions and display price with tolls
    7. Do not include intro or outro, just the json file
    8. Make sure you are returning a functioning JSON file
    9. The transit time should be accurate according to how long this route would take typically on that day of the week at that time with that particular transit type and/or vehicle
    10. The day should start with the transit from stay location to the first activity
    11. The day should end with the transit back to stay location
    12. Specify the transit transport in the name of the transit activity such bus, train, subway, metro, monorail and etc.
    13. If the response from the user does not make logical sense, then create a single activity in the json file stating that there is an error in the generation.
    14. Do not include ''' at the beginning or at the end of the file, keep it a readable JSON file.
    15. Do not forget about the users preference for food when adding the lunch activity
    16. Make sure the JSON file is readable, ends in an appropriate way and starts appropriately
    17. Make sure you bring the user back home to the starting points at the end of the day
    18. Make sure the transit times are accurate
    19. An individual day should always end with a transit that takes the user back to their place of stay
    20. Make sure the start time of the first transit and the end time of the last transit coincide to the Start and end time of schedule for the day that the user selected`;
    //20. Do not put {} at the end of the JSON File!!!
    //21. If the transit requires several transit types such as taking the subway and then walking, then separate them into two different activities and continue in such same pattern.
    //22. Make sure your itinerary is for all the days that the user requested and fill up the entire time the user gave!!!
    


    //Question=Question;//+formatInstr;
    const geminiRequest = await generateGeminiRequest(Question);

    const geminiResponse = await geminiService(geminiRequest);
    //testing
    console.log(geminiResponse);
    return geminiResponse;
}