
const alexList = [
    { "movie": "Master and Commander: The Far Side of the World", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "4.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "4.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "High and Low", "stars": "4.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "4/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Suicide Squad", "stars": "4/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Kill Bill: Vol. 1", "stars": "4/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "4/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Platform", "stars": "3/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Hardcore Hentry", "stars": "3/5", "liked": "Not Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Collateral", "stars": "3/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Click", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "The Terminator", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Fallen Angels", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "The Batman", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "A Silent Voice", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Cloverfield", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Princess Mononoke", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Sanjuro", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "A Beautiful Mind", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Fight Club", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Das Leben der Anderan", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Midsommar", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "John Wick", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "I Want To Eat Your Pancreas", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Yojimbo", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
];

const ayubList = [
    { "movie": "The Matrix", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Princess Mononoke", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Kill Bill: Vol. 1", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Suicide Squad", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "The Possession", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "1.5/5", "liked": "Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Liked", "rating": "" },
];

const garrettList = [
   
];

const jaydenList = [
    
];

const joeList = [
    { "movie": "Mad Max: Fury Road", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "5/5", "liked": "Liked", "rating": "" },
    { "movie": "Se7en", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Grand Budapest Hotel", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Kill Bill: Vol. 1", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Princess Mononoke", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Fight Club", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Batman", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Lives of Others", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Suicide Squad", "stars": "1.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "1.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "A Silent Voice", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "N/A", "liked": "N/A", "rating": "DID NOT SEE THIS MOVIE" },
];

const johnList = [
    { "movie": "The Batman", "stars": "5/5", "liked": "Liked", 
        "rating": "This movie is absolutely everything I ever wanted from a Batman film. The lighting, the performances, the symbolism, the characters, everything was incredible and perfect. This movie had the best-written Riddler I've seen in any Batman IP, and the theme song gives me goosebumps everytime I watch it. This is a movie I will never forget." },
    { "movie": "The Suicide Squad", "stars": "5/5", "liked": "Liked", 
        "rating": "There are two superhero movies that are perfect and exactly what I want them to be, for two different reason: The Batman and The Suicide Squad. Where Suicide Squad failed, James Gunn had The Suicide Squad not only succeed, but excel. The comedy is perfectly timed and written, and the writing is done so well to make me care and be invested in characters as niche as Polka Dot man. All the character performances are great and very compelling, and overall it's easily the funniest DC movie I've ever seen." },
    { "movie": "A Silent Voice", "stars": "5/5", "liked": "Liked", 
        "rating": "I haven't seen many anime movies, and this was the first I saw that wasn't a studio ghibli film. I went in expecting to hate it to be honest, but the movie somehow made me feel very interested in the character's and their story. For many reasons, this movie connected with me in a way no other movie has, and I think 5 stars is the only way to fairly explain how much this movie meant to me while I watched it." },
    { "movie": "The Grand Budapest Hotel", "stars": "5/5", "liked": "Liked", 
        "rating": "This movie pleasantly surprised me with it's comedy. This was my first Wes Anderson film, and if the others are anything like this I an excited to see more. The comedy was perfectly written and timed, Gustave was played excellently (very strange to hear Voldemort again). The style of shorts and effects was reminiscent of 2000's Christmas movies, which gave me a nice nostalgic feeling. Overall, truly awesome movie." },
    { "movie": "Se7en", "stars": "5/5", "liked": "Liked", 
        "rating": "This was one of those movies I had on the list of 'need to watch' for a very long time. I went into it having already had the ending spoiled from a Film Theory video 2 years prior. But nonetheless I absolutely adored it. The performances were incredible, the mystery was setup beautifully, and the writing was awesome. I had heard that Matt Reeves had used Se7en for inspiration when writing the story around his Riddler, and I can see that all throughout this film, which definitely adds to my opinion on it." },
    { "movie": "Fight Club", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "4.5/5", "liked": "Liked", "rating": "" },
    { "movie": "John Wick", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Gladiator", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Collateral", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Yojimbo", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "The Matrix", "stars": "4/5", "liked": "Liked", "rating": "" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Hardcore Henry", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Mad Max: Fury Road", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Sanjuro", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "mid90s", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Jarhead", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "A Beautiful Mind", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Click", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "High and Low", "stars": "3/5", "liked": "Liked", "rating": "" },
    { "movie": "Kill Bill: Vol. 1", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Cloverfield", "stars": "2.5/5", "liked": "Liked", "rating": "" },
    { "movie": "Uncut Gems", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Midsommar", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Princess Mononoke", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "The Platform", "stars": "2/5", "liked": "Liked", "rating": "" },
    { "movie": "Full Metal Jacket", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Das Leben der Anderan", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "Fallen Angels", "stars": "2/5", "liked": "Not Liked", "rating": "" },
    { "movie": "The Possession", "stars": "1/5", "liked": "Not Liked", "rating": "" },
    { "movie": "9", "stars": "0.5/5", "liked": "Not Liked", "rating": "" },
];

const trevorList = [
    { "movie": "Gladiator", "stars": "5/5", "liked": "Liked", 
        "rating": "Absolutley AMAZING movie. The music was fantastic and on point. The characters were really good, even the villain whom I despised so much. Russel Crowe played is role amazingly, like usual. The plot was really good and engaging. My only con was the first 45 minutes were pretty fast paced, but it wasn't the worst. I feel the extended may be better but I wouldn't know as I've seen the original only. My snack for this movie was some Doritos Cool Ranch. Overall a fantastic movie and an amazing tale if a Gladiator." },
    { "movie": "Mad Max: Fury Road", "stars": "5/5", "liked": "Liked", 
        "rating": "Really good movie. Although I must admit I really didn't like the beginning. The effects look weird, same with the movie. It has a weird look to it like its an older movie, quirky look that I wasn't a fan of at first. But I grew accustom to it. The music was ON POINT, gave me goosebumps. The characters were great, although I wasn't too fond of furiosa. Was just kinda boring to me. She was a champ tho. The first action scene with all the explosions I didn't like it. Felt like a michael bay movie, didn't really understand what was going on. The second action sequence towards the ending was fucking amazing tho. Had much more impact now that we actually grew with the characters. I really liked this movie. My snack was a full bag of garden salsa sun chips. Overall I really liked this movie. Probably not seeing furiosa though." },
    { "movie": "Hardcore Henry", "stars": "5/5", "liked": "Liked", 
        "rating": "This movie was sick as fuck. Opening was fire as hell, music was amazing. THEY PLAYED DONT STOP ME NOW. Action was great. Characters although few were still sick as hell, hippy jimmy was the best. The villain was cool and charismatic. The final fight was insanely good. My snack was 4 slices of little caesars cheesed stuffed crust pizza." },
    { "movie": "The Matrix", "stars": "5/5", "liked": "Liked", 
        "rating": "Red Pill. Anime as fuck. Beginning dystopian cool as fuck should've went into it more. Power of love was kind of gay. Overall pretty fire" },
    { "movie": "A Silent Voice", "stars": "4.5/5", "liked": "Not Liked", 
        "rating": "Was pretty good. Very sad but wholesome as hell. My food was a dominos cheese pizza. I don't have much to say other than I liked the movie." },
    { "movie": "mid90s", "stars": "4.5/5", "liked": "Liked", 
        "rating": "Very good movie. Start of the movie made me sad and I wasn't feeling it. However, very quickly the movie had grown on me. The characters are amazing. Fuckshit, Fourth Grade, Ray, even Rueben and Ian. Their interactions were really well written and it was fun to see stevie grow even if it was a short period of time. I had no stale lays salt and vinegar chips for a snack but I did not eat any of them. Overall I pretty good movie." },
    { "movie": "Princess Mononoke", "stars": "4/5", "liked": "Not Liked", 
        "rating": "a visually stunning and beautiful movie. Soundtrack is whimsical, the characters are very well written. Atashiki was a lot like link lol. The only complaints I have are the parts with the short fat guy were pretty boring, the voices for the animals sounded a bit of, and the pacing was a little too slow in parts which isn't for me. But overall the movie was pretty darn good. Also my snack for the movie was a 6 inch turkey sub from subway, and a few handfuls of watermelon sour patch kids." },
    { "movie": "Se7en", "stars": "4/5", "liked": "Not Liked", 
        "rating": "Movies atmosphere was pretty good, the killer was pretty cool, the deaths were pretty gruesome, the rain was pretty. The final death was pretty predictable though. My snack was a footlong turkey sub from subway and a couple of cool ranch Doritos. Overall the movie wasn't too bad." },
    { "movie": "Click", "stars": "4/5", "liked": "Not Liked", 
        "rating": "The movie was funny as hell at first. Music was actually hella dramatic for what it is. The effects weren't very good but that's to be expected. Christopher walken was amazing as expected. But the movie got tragic towards it's second half, was genuinely a little sad. My snack was lays salt and vinegar chips with helluva good French onion dip. Overall pretty good movie." },
    { "movie": "Fight Club", "stars": "4/5", "liked": "Not Liked", 
        "rating": "Movie was really good. The ost was pretty good at setting the tone. The movie on the beginning was very entertaining, the middle was losing it a little bit. But brought it right back with the twist he was a schizo. Turned out much better than I originally thought. My snack was lays salt and vinegar chips with french onion dip." },
    { "movie": "Midsommar", "stars": "4/5", "liked": "Not Liked", 
        "rating": "Fucking terrifying but amazing" },
    { "movie": "The Suicide Squad", "stars": "4/5", "liked": "Not Liked", 
        "rating": "My 2nd review of this movie. I enjoyed this movie a lot. Pacing was good, good selection of music, it had a colorful cast of characters. Starro was pretty good villain. The movie had a very good representation of underground supervillains. Polka dot man was cool, milton was funny, Peacemaker is very fun to watch. I did not have a snack for this movie. Overall I enjoyed it." },
    { "movie": "Collateral", "stars": "4/5", "liked": "Not Liked", 
        "rating": "Very good movie. The music was great, the characters were great, the premise was great. The scene where max went in and pretended he was vincent was my favorite scene. I did think it was a little bit on the slower end 3/5th a way through the movie though. Vincent was very entertaining. My snack for this movie was a Mcdonalds Big Mac, Hot N' Spicy Mcchicken, and Large fries with ketchup. Overall a pretty good movie." },
    { "movie": "The Truman Show", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "Very interesting. Made me start to trip out a bit with the 'all about me' which scared me. Funny product placement, goofy ass jim carry laugh. Overall pretty good movie." },
    { "movie": "The Batman", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "My snack was a family size bag of pretzels. I think the movie was a lil sad but that was fine. I felt kind of empty throughout most of the movie. Penguin was good, selena kyle was hot. But that's all I really think of it. I can appreciate it being a good movie though. Overall not too bad" },
    { "movie": "Cloverfield", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "Found footage was cool. Marlena was hot. The monster was cool as fuck and the bugs were scary and gross. It did well with the horror made me feel nervous in some parts. The helicopter shot with the overhead shot of the monster was very cool. My snack was a bowl of cheeze its." },
    { "movie": "The Platform", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "My snack was nacho cheese doritos and some pretzel sticks. Overall I find the movie to have an interesting premise. The people like baharat were cool. The music isn't too crazy but its nice. Overall I'd rate it 3.5 stars obviously." },
    { "movie": "Jarhead", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "Pretty good war movie. I liked it more than 1917, Music was pretty average but the characters and and story made up for it. The wife is a loser for cheating. My food was a 4 slices of dominos cheese pizza. Overall not much to say about the movie other than it was pretty good. Got a little boring towards the ending." },
    { "movie": "Master and Commander: The Far Side of the World", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "First off It's the same actor as the guy who played john knash or nash in inside a beautiful mind and it took a minute to adjust because of it, which is fine. The music was alright although wasn't anything crazy. The characters didn't mean much to me at first. Took some time for me to actually start liking them. Padeen and the boy with one arm were the best characters. The movies plot was alright it was engaging enough. The ambience though was the best part of the movie. It just felt really nice. My snack was both a bowl of cheez-its and 5 pieces of french toast. Overall that's all there is to really say about the movie. Was pretty good." },
    { "movie": "Uncut Gems", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "Music was very good, although a few misses here and there. The beginning was very engaging and so was the final bet. The middle, wasn't as engaging was a little bored to be honest. I don't have much to say other than it is an alright movie. The snack for my movie was was 2 bowls of lays salt and vinegar chips. Overall it was an alright movie." },
    { "movie": "All Quiet on the Western Front (2022)", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "pretty good movie. The main character was very entertaining. All the characters were all pretty cool. Music was a little un-noticable though. The ending made me furious and it was sad. Like most of the movie, the deaths were really sad. My food for the movie was a calzone and a half of another one, which was 3 cheese. Overall a pretty good movie." },
    { "movie": "The Grand Budapest Hotel", "stars": "3.5/5", "liked": "Not Liked", 
        "rating": "Alright movie. The effects were really bad but thats the only real major flaw about the movie. And even then I can see it being intentional. The music was really good at times it did nice to add to the movie. The plot was alright but were the movie really shines is the humor and characters. The characters are very colorful and the jokes are relatively good. My snack for this movie was half a cup of xtra cheddar goldfish. Overall I liked the movie however somethings a little off-putting. I can't say why. But the movie was nice." },
    { "movie": "Kill Bill: Vol. 1", "stars": "3/5", "liked": "Not Liked", 
        "rating": "Movie felt like a short anime. The music was on point besides the final fight music. The fight vs the girl with the mace was the best fight scene. Didn't like the feet shots and rape is a no no. Ion like it. Animation scenes were hype although they were cluttered with lines amongst the ridges. The fact people got away with so much murder is wack. The fight scene with the 40thousand people was just way too long and it was ridiculous how dumb the men were acting. Two or three at a time then quitting. My snack was literally just 3 or 4 nacho cheese doritos. Overall better than the terminator, and a decent movie." },
    { "movie": "John Wick", "stars": "3/5", "liked": "Not Liked", 
        "rating": "This movie was alright. Just about what I'd expect it to be, just an action movie. The plot was alright it was what it needed to be. Music was kind of iffy don't recall much pieces. The pacing was fast in the begininng but towards the ending the movie went on for far too long. Felt like it was dragging itself out. Which it'd be fine but it didn't feel too engaging. At least ever since the bath scene Imo. My snack was a three cheese calzone and a half of one. Overall a movie but it felt very average." },
    { "movie": "9", "stars": "3/5", "liked": "Not Liked", 
        "rating": "Everything is great but it's far too fast paced. The design is great, the music was great. The plot is great. The problem with this movie is that it doesn't have enough time to actually flourish. Good movie but flawed with the pacing." },
    { "movie": "The Terminator", "stars": "2.5/5", "liked": "Not Liked", 
        "rating": "Effects were mesh. Sound track was good. Plot was kind of boring. Feels a lot like no country for old men. I can appreciate it being a good movie but was not what I expected at all. Overall a mediocre movie. Snack was 11 chicken tenders with ketchup." },
    { "movie": "Yojimbo", "stars": "2.5/5", "liked": "Not Liked", 
        "rating": "It was an okay movie. Didn't like the music, the characters were colorful though and gun guy was supreme. Had a fun premise it felt like a fun little side quest. Although I wasn't a big fan of the movie. Also my snack was post honey wheels" },
    { "movie": "Indiana Jones: Raiders of the Lost Ark", "stars": "2.5/5", "liked": "Not Liked", 
        "rating": "The movies definitely a classic. The music is Iconic and so are the characters. The girl was hot, the movies very colorful with a nice premise. It's weird Indiana jones is so good at fighting. The effects are a little obviously fake but I can excuse it for how old it is. Overall a pretty good movie. My snack was 2 chicken patties." },
    { "movie": "A Beautiful Mind", "stars": "2/5", "liked": "Not Liked", 
        "rating": "Movie was pretty mid. I saw it in senior year, thought it was good but looking back it really wasn't. Pacing was too fast and the movie just wasn't really that engagins. My snack was some peanut butter m&ms and some xtra cheddar goldfish. Overall a pretty mediocre movie." },
    { "movie": "Sanjuro", "stars": "2/5", "liked": "Not Liked", 
        "rating": "Haven't seen the entire movie as I had to leave. But this movie was pretty good for a sequel. For what it is at least. It's a sequel in a sense mario 3 is a sequel to super mario bros. Same format, same actors, just a different plot. My snack was lays salt and vinegar chips with helluva french onion dip. Anyway this movies wasn't too bad for what I have seen. Although I must admit I have not really like the first movie so much." },
    { "movie": "The Possession", "stars": "2/5", "liked": "Not Liked", 
        "rating": "bad movie but fun movie" },
    { "movie": "Fallen Angels", "stars": "1.5/5", "liked": "Not Liked", 
        "rating": "Looks like it smells bad, a lot of mesh gross scenes. Very boring and feels super pointless. Just a longeval slice of life movie that I wasn't very into. I liked the parts with the dad it was wholesome, the girl masturbating was unnecessary and gross. The music was nice had a creepy song though. Overall I did not like it. Snack was a family sized bag of pretzels." },
    { "movie": "Das Leben der Aderan", "stars": "1/5", "liked": "Not Liked", 
        "rating": "My snack was Doritos cool ranch. Anyway I found this movie to be very boring. A few funny moments but that's not the point of the movie anyway. I found the plot to be boring and same with the characters, I liked the Irishman more and that's not saying much. Overall I do not have much to say and I did not like it." },
    { "movie": "High and Low", "stars": "N/A", "liked": "N/A", 
        "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Full Metal Jacket", "stars": "N/A", "liked": "N/A", 
        "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "Attack on Titan: The Final Chapter Part 1", "stars": "N/A", "liked": "N/A", 
        "rating": "DID NOT SEE THIS MOVIE" },
    { "movie": "I Want to Eat Your Pancreas", "stars": "N/A", "liked": "N/A", 
        "rating": "DID NOT SEE THIS MOVIE" },
];

// Function to populate a table with data
// Function to populate a table with data
function populateTable(tableId, data) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ''; // Clear any existing rows

    // Iterate over each entry in the data array and add a row
    data.forEach((entry, index) => {
        const row = `
            <tr>
                <td>#${index + 1}</td>  <!-- Automatically generated rank -->
                <td>${entry.movie}</td>
                <td>${entry.stars}</td>
                <td>${entry.liked}</td>
                <td>${entry.rating}</td>
            </tr>
        `;
        tableBody.innerHTML += row; // Append the row to the table body
    });
}

// Populate all tables on page load
window.onload = function() {
    populateTable('alex-table', alexList);
    populateTable('ayub-table', ayubList);
    populateTable('garrett-table', garrettList);
    populateTable('jayden-table', jaydenList);
    populateTable('joe-table', joeList);
    populateTable('john-table', johnList);
    populateTable('trevor-table', trevorList);
};


// Populate all tables on page load
window.onload = function() {
    populateTable('alex-table', alexList);
    populateTable('ayub-table', ayubList);
    populateTable('garrett-table', garrettList);
    populateTable('jayden-table', jaydenList);
    populateTable('joe-table', joeList);
    populateTable('john-table', johnList);
    populateTable('trevor-table', trevorList);
};
