import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPostPage.css';
import annapurnaBaseCamp from './images/annapurnabasecamp.jpg';
import kathmanduvalley from './images/kathmanduvalley.jpg';
import chitwannationalpark from './images/chitwannationalpark.jpg';
import daalbhat from './images/daalbhat.jpg';
import momomaking from './images/momomaking.jpg';
import newaricuisine from './images/newaricuisine.jpg';
import everestregion from './images/everestregion.jpg';
import bardianationalpark from './images/bardianationalpark.jpg';
import pokharaarrival from './images/pokhara.jpg';
import tranquilboating from './images/tranquilboating.jpg';
import rhododendrontrail from './images/rhododendrontrail.jpg';
import reachedannapurna from './images/reachedannapurna.jpg';
import kathmandudurbar from './images/kathmandudurbar.jpeg';
import swayambhunath from './images/swayambhunath.jpg';
import bouddhanath from './images/bouddhanath.jpg';
import pashupatinath from './images/pashupatinath.jpg';
import bhaktapurdurbar from './images/bhaktapurdurbar.jpg';
import patandurbar from './images/patandurbar.jpg';
import chitwanwalking from './images/chitwanwalking.png';
import canoe from './images/canoe.jpg';
import elephantsafari from './images/elephantsafari.jpg';
import birdwatching from './images/birdwatching.jpg';
import tharudance from './images/tharudance.jpg';
import daalbhatmaking from './images/daalbhatmaking.webp';
import daalbhatserved from './images/daalbhatserved.webp';
import taalbarahi from './images/taalbarahi.jpg';
import lakeside from './images/lakeside.jpg';
import worldpeacepagoda from './images/worldpeacepagoda.jpg';
import boatsonphewa from './images/boatsonphewa.jpg';
import begnaslake from './images/begnaslake.webp';
import canoebardia from './images/canoebardia.jpeg';
import elephantsafaribardiya from './images/elephantsafaribardiya.jpg';
import jeepsafari from './images/jeepsafari.jpg';
import junglewalkbardia from './images/junglewalkbardia.jpg';
import tharuvillage from './images/tharuvillage.jpg';
import everesttrek from './images/everesttrek.jpg';
import gokyolake from './images/gokyolake.jpg';
import pikeypeak from './images/pikeypeak.jpg';
import shorttrek from './images/shortertrek.webp';
import momoingredients from './images/momoingredients.webp';
import foldingmomo from './images/foldingmomo.jpeg';
import cookingnewaridishes from './images/cookingnewaridishes.jpeg';
import newariplatter from './images/newariplatter.jpg';
import Header from '../components/header';
import Footer from '../components/footer';
import CommentSection from '../components/commentSection';

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockPosts = [
        {
          itineraryId: 1,
          slug: 'annapurna-base-camp-trek',
          title: 'Discover the Wonders of the Annapurna Base Camp Trek',
          coverImage: annapurnaBaseCamp,
          author: 'Adventure Nepal Team',
          date: 'May 5, 2025',
          categories: [{ name: 'Adventure', slug: 'adventure' }, { name: 'Trekking', slug: 'trekking' }],
          tags: ['Nepal', 'Himalayas', 'Trekking', 'Annapurna'],
          fullContent: [
            { type: 'paragraph', text: 'Embark on an unforgettable journey to the Annapurna Base Camp (ABC) Trek, a classic Himalayan adventure that takes you through diverse landscapes and offers breathtaking mountain views. Inspired by the scenic Trunyan Hill hike, this trek provides a similar sense of awe and accomplishment.' },
            { type: 'heading', level: 2, text: 'Getting to the Annapurna Region' },
            { type: 'paragraph', text: 'The adventure typically begins with a flight to Pokhara, a beautiful lakeside city and the gateway to the Annapurna region. Upon arrival in Pokhara, you\'ll be greeted by stunning views of the Annapurna range (weather permitting!). The journey continues with a scenic drive to one of the starting points of the trek, such as Nayapul or Phedi.' },
            { type: 'image', url: pokharaarrival, alt: 'Arrival in Pokhara with Annapurna views', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'Similar to the journey to Trunyan, the initial travel involves immersing yourself in the local culture and preparing for the trek ahead. Pokhara itself offers opportunities to explore serene lakes and bustling markets before heading into the mountains.' },
            { type: 'heading', level: 2, text: 'The Trek to Base Camp' },
            { type: 'paragraph', text: 'The trail winds through charming villages inhabited by the welcoming Gurung communities, lush rhododendron forests that burst into color during spring, and alongside glacial rivers carving their way through the valleys. Each day of the trek unveils new vistas, from terraced fields to cascading waterfalls, with the majestic snow-capped peaks constantly in view.' },
            { type: 'image', url: rhododendrontrail, alt: 'Trekking trail through rhododendron forest in Annapurna region', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'As you ascend, the air gets crisper, and the landscape transforms, offering increasingly dramatic views of iconic mountains like Machhapuchhre (Fishtail) and Annapurna South. The feeling of walking amidst these giants is truly awe-inspiring, much like the panoramic views experienced from Trunyan Hill, albeit on a grander scale.' },
            { type: 'heading', level: 2, text: 'Reaching Annapurna Base Camp' },
            { type: 'paragraph', text: 'Arriving at the Annapurna Base Camp (4,130 meters / 13,550 feet) is a profoundly rewarding experience. Surrounded by towering peaks like Annapurna I, Annapurna South, Hiunchuli, and the iconic Machhapuchhre, you\'ll feel a deep sense of connection with the raw power and beauty of the Himalayas. The base camp itself is a small settlement nestled amongst these giants, offering unparalleled photographic opportunities, especially at sunrise and sunset.' },
            { type: 'image', url: reachedannapurna, alt: 'Annapurna Base Camp surrounded by snow-capped mountains', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'The feeling of accomplishment upon reaching ABC mirrors the satisfaction of reaching the summit of Trunyan Hill, with the majestic mountain scenery serving as an unforgettable reward for your efforts.' },
            { type: 'heading', level: 2, text: 'Things to Know Before You Go' },
            {
              type: 'list', items: [
                '<strong>Difficulty:</strong> Moderate to strenuous. Requires a good level of fitness and some trekking experience is recommended.',
                '<strong>Duration:</strong> Typically 7-10 days, depending on the specific itinerary and acclimatization days.',
                '<strong>Best Time to Trek:</strong> Spring (March-May) and Autumn (September-November) offer the most stable weather and clear mountain views.',
                '<strong>Altitude Sickness:</strong> Gradual ascent and allowing for acclimatization days are crucial to prevent altitude sickness. Stay hydrated and listen to your body.',
                '<strong>Permits:</strong> You will need an Annapurna Conservation Area Permit (ACAP) and a Trekkers\' Information Management System (TIMS) card, which can be obtained in Kathmandu or Pokhara.',
              ]
            },
            { type: 'heading', level: 2, text: 'What to Bring' },
            {
              type: 'list', items: [
                'Sturdy, well-broken-in trekking boots with good ankle support.',
                'Warm layers of clothing, including thermal base layers, fleece jackets, and a down jacket.',
                'Waterproof and windproof outer jacket and trousers.',
                'A comfortable sleeping bag (depending on the teahouse accommodation).',
                'Sunscreen, a wide-brimmed hat, and UV protection sunglasses.',
                'A basic first-aid kit with personal medications.',
                'Plenty of water bottles or a hydration pack, and water purification tablets or a filter.',
                'Energy snacks like nuts, dried fruits, and energy bars.',
                'A headlamp or flashlight with extra batteries.',
                'Trekking poles (optional, but highly recommended for stability).',
              ]
            },
            { type: 'paragraph', text: 'The Annapurna Base Camp Trek, while more extensive and challenging than the Trunyan Hill hike, offers a similar opportunity to deeply immerse yourself in the breathtaking beauty of nature and challenge yourself physically. The memories and panoramic views of the world\'s highest mountains gained on this trek will undoubtedly last a lifetime.' },
          ],
        },
        {
          itineraryId: 2,
          slug: 'kathmandu-valley-cultural-tour',
          title: 'Immerse Yourself in the Rich Culture of Kathmandu Valley',
          coverImage: kathmanduvalley,
          author: 'Nepal Cultural Expeditions',
          date: 'May 8, 2025',
          categories: [{ name: 'Culture', slug: 'culture' }, { name: 'Cultural Tours', slug: 'cultural-tours' }],
          tags: ['Nepal', 'Kathmandu', 'Temples', 'Tradition'],
          fullContent: [
            { type: 'paragraph', text: 'Embark on a captivating cultural tour of the Kathmandu Valley, a UNESCO World Heritage site brimming with ancient temples, intricate palaces, and vibrant traditions. This journey offers a deep dive into Nepal\'s rich historical and artistic heritage.' },
            { type: 'heading', level: 2, text: 'Day 1: Kathmandu Durbar Square' },
            { type: 'paragraph', text: 'Begin your exploration at Kathmandu Durbar Square, a complex of palaces, courtyards, and temples that showcase the exquisite Newari architecture. Witness the Kumari Ghar, home to the living goddess, and explore the historical narratives etched in stone and wood.' },
            { type: 'image', url: kathmandudurbar, alt: 'Kathmandu Durbar Square with ancient temples', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'Wandering through the Durbar Square provides a glimpse into the daily rhythms and cultural practices of the Kathmandu residents.' },
            { type: 'heading', level: 2, text: 'Day 2: Swayambhunath & Boudhanath' },
            { type: 'paragraph', text: 'Discover the iconic Swayambhunath Stupa, perched atop a hill offering panoramic views of Kathmandu Valley. This ancient stupa, adorned with the watchful eyes of Buddha, is a significant Buddhist site. Later, visit Boudhanath Stupa, one of the largest spherical stupas in Nepal, surrounded by monasteries and prayer wheels.' },
            { type: 'image', url: swayambhunath, alt: 'Swayambhunath Stupa', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'image', url: bouddhanath, alt: 'Boudhanath Stupa', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'The serene atmosphere and spiritual energy of these sites offer a unique and uplifting experience.' },
            { type: 'heading', level: 2, text: 'Day 3: Pashupatinath & Bhaktapur Durbar Square' },
            { type: 'paragraph', text: 'Visit Pashupatinath Temple, a sacred Hindu temple dedicated to Lord Shiva, located on the banks of the Bagmati River. Observe the traditional cremation ceremonies (from a respectful distance). In the afternoon, travel to Bhaktapur Durbar Square, a well-preserved ancient city showcasing medieval Newari art and architecture.' },
            { type: 'image', url: pashupatinath, alt: 'Pashupatinath', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'image', url: bhaktapurdurbar, alt: 'Bhaktapur Durbar Square with traditional buildings', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'Exploring the historical streets and artistic details of Bhaktapur offers a sense of stepping back in time.' },
            { type: 'heading', level: 2, text: 'Day 4: Patan Durbar Square & Departure' },
            { type: 'paragraph', text: 'Explore Patan Durbar Square, another architectural gem in the Kathmandu Valley, renowned for its fine arts and crafts. Visit the Patan Museum, housed in a former palace, to admire the exquisite metalwork and sculptures. Depending on your departure schedule, you might have time for some souvenir shopping.' },
            { type: 'image', url: patandurbar, alt: 'Patan Durbar Square with intricate carvings', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'This cultural tour provides a deep insight into the rich heritage and artistic traditions of Nepal, offering an enriching experience.' },
            { type: 'heading', level: 2, text: 'Things to Know Before You Go' },
            {
              type: 'list', items: [
                '<strong>Duration:</strong> Typically 3-4 days.',
                '<strong>Best Time to Visit:</strong> Spring (March-May) and Autumn (September-November) for pleasant weather.',
                '<strong>Respectful Dress:</strong> Dress modestly when visiting religious sites (shoulders and knees covered).',
                '<strong>Guides:</strong> Hiring a local guide can enhance your understanding of the history and culture.',
              ]
            },
            { type: 'heading', level: 2, text: 'What to Bring' },
            {
              type: 'list', items: [
                'Comfortable walking shoes.',
                'Lightweight and breathable clothing.',
                'Sunscreen, hat, and sunglasses.',
                'A light jacket or sweater for cooler evenings.',
                'A small backpack for essentials.',
                'Camera to capture the historical sites.',
              ]
            },
            { type: 'paragraph', text: 'This cultural tour of the Kathmandu Valley offers a fascinating appreciation for Nepal\'s rich history, art, and traditions.' },
          ],
        },
        {
          itineraryId: 3,
          slug: 'chitwan-national-park-nature-safari',
          title: 'Experience Wildlife and Nature in Chitwan National Park',
          coverImage: chitwannationalpark,
          author: 'Wildlife Safaris Nepal',
          date: 'May 10, 2025',
          categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Wildlife Safari', slug: 'wildlife-safari' }],
          tags: ['Nepal', 'Chitwan', 'Safari', 'Wildlife'],
          fullContent: [
            { type: 'paragraph', text: 'Embark on an exciting nature safari in Chitwan National Park, Nepal\'s first national park and a UNESCO World Heritage site. This adventure, while focused on wildlife encounters rather than hiking, shares the spirit of exploration and natural discovery.' },
            { type: 'heading', level: 2, text: 'Day 1: Arrival in Chitwan & Jungle Activities' },
            { type: 'paragraph', text: 'Arrive in Chitwan and settle into your jungle lodge. Begin your wildlife adventure with activities like a guided nature walk, where you can learn about the park\'s diverse flora and fauna, and a visit to a Tharu village to experience the local culture.' },
            { type: 'image', url: chitwanwalking, alt: 'Jungle walk in Chitwan National Park', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'Interacting with the local Tharu community provides cultural insights into the region surrounding the national park.' },
            { type: 'heading', level: 2, text: 'Day 2: Canoe Ride & Elephant Safari' },
            { type: 'paragraph', text: 'Enjoy a peaceful canoe ride along the Rapti River, providing excellent opportunities to observe aquatic birds, crocodiles, and other wildlife along the riverbanks.' },
            { type: 'image', url: canoe, alt: 'Canoe ride in Chitwan National Park', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'In the afternoon, experience a unique elephant-back safari, venturing deeper into the jungle for a chance to spot rhinos and possibly even tigers.' },
            { type: 'image', url: elephantsafari, alt: 'Elephant safari in Chitwan for wildlife viewing', style: { maxWidth: '80%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'The thrill of encountering wildlife in their natural habitat offers a different kind of excitement compared to the scenic rewards of a hike.' },
            { type: 'heading', level: 2, text: 'Day 3: Bird Watching & Cultural Program' },
            { type: 'paragraph', text: 'Chitwan is a paradise for bird watchers, with over 500 species recorded. Spend the morning exploring different habitats with a knowledgeable guide.' },
            { type: 'image', url: birdwatching, alt: 'Bird watching in Chitwan National Park', style: { maxWidth: '80%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'In the evening, enjoy a traditional Tharu cultural dance performance showcasing their unique customs and heritage.' },
            { type: 'image', url: tharudance, alt: 'Traditional Tharu dance performance in Chitwan', style: { maxWidth: '80%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'The cultural program offers another layer of understanding the local context.' },
            { type: 'heading', level: 2, text: 'Day 4: Departure' },
            { type: 'paragraph', text: 'After breakfast, enjoy a final opportunity for wildlife viewing or a nature walk before departing from Chitwan, carrying memories of incredible wildlife encounters and the serene beauty of the Terai region.' },
            { type: 'paragraph', text: 'A nature safari in Chitwan National Park offers a thrilling and immersive experience in Nepal\'s natural wonders, providing a different kind of adventure than mountainous landscapes.' },
            { type: 'heading', level: 2, text: 'Things to Know Before You Go' },
            {
              type: 'list', items: [
                '<strong>Duration:</strong> Typically 3-4 days.',
                '<strong>Best Time to Visit:</strong> October to March for pleasant weather and good wildlife viewing.',
                '<strong>Malaria Prevention:</strong> Consult your doctor about malaria precautions for the Terai region.',
                '<strong>Park Regulations:</strong> Follow the guidelines provided by your guide and the park authorities.',
              ]
            },
            { type: 'heading', level: 2, text: 'What to Bring' },
            {
              type: 'list', items: [
                'Lightweight and comfortable clothing in neutral colors.',
                'Sturdy walking shoes or boots.',
                'Insect repellent.',
                'Sunscreen, hat, and sunglasses.',
                'Binoculars for wildlife viewing.',
                'Camera with a good zoom lens.',
              ]
            },
            { type: 'paragraph', text: 'A wildlife safari in Chitwan National Park provides an unforgettable opportunity to connect with nature and witness incredible wildlife, offering a unique adventure in the heart of Nepal.' },
          ],
        },
        {
          itineraryId: 4,
          slug: 'nepali-dal-bhat-recipe',
          title: 'The Heart of Nepali Cuisine: Mastering Dal Bhat',
          coverImage: daalbhat,
          author: 'Nepali Food Blog',
          date: 'May 7, 2025',
          categories: [{ name: 'Food', slug: 'food' }, { name: 'Culture', slug: 'culture' }],
          tags: ['Nepal', 'Nepali Food', 'Recipe', 'Dal Bhat'],
          fullContent: [
            { type: 'paragraph', text: 'Dal Bhat is the national dish of Nepal, a staple meal enjoyed by people across the country. Understanding and even mastering this dish offers a cultural journey into the heart of Nepali life.' },
            { type: 'heading', level: 2, text: 'Ingredients:' },
            {
              type: 'list', items: [
                '1 cup lentils (masoor dal, moong dal, or a mix)',
                '2 cups rice',
                '2 tbsp cooking oil',
                '1 onion, finely chopped',
                '2 cloves garlic, minced',
                '1 inch ginger, grated',
                '1 tsp turmeric powder',
                '1 tsp cumin powder',
                '1/2 tsp coriander powder',
                'Salt to taste',
                'Water as needed',
                'Optional: Vegetables for Tarkari (curry), Achar (pickle)',
              ]
            },
            { type: 'image', url: daalbhatmaking, alt: 'Ingredients for Nepali Dal Bhat', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
            { type: 'heading', level: 2, text: 'Instructions:' },
            {
              type: 'list', items: [
                '<strong>Wash the lentils:</strong> Thoroughly rinse the lentils under cold water until the water runs clear. Soak them for at least 30 minutes.',
                '<strong>Cook the rice:</strong> Prepare the rice according to your preferred method (boiling, steaming, or using a rice cooker).',
                '<strong>Sauté the aromatics:</strong> Heat oil in a pot over medium heat. Add the chopped onion and sauté until golden brown. Then, add the minced garlic and grated ginger and cook for another minute until fragrant.',
                '<strong>Add spices and lentils:</strong> Stir in the turmeric powder, cumin powder, and coriander powder. Add the soaked lentils and water (about 3-4 cups). Bring the mixture to a boil, then reduce the heat and simmer gently until the lentils are cooked and mushy (about 20-30 minutes).',
                '<strong>Season and adjust:</strong> Season the dal with salt to taste. If the consistency is too thick, add more water. Simmer for a few more minutes.',
                '<strong>Prepare Tarkari and Achar (optional):</strong> While the dal and bhat are cooking, prepare vegetable curries (Tarkari) and Nepali pickles (Achar) to accompany the meal.',
                '<strong>Serve hot:</strong> Ladle the dal into a bowl, serve the bhat alongside, and accompany with Tarkari and Achar. Enjoy the comforting and nutritious flavors of Nepal!',
              ]
            },
            { type: 'image', url: daalbhatserved, alt: 'Nepali Dal Bhat served with Tarkari and Achar', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
            { type: 'heading', level: 2, text: 'The Cultural Significance of Dal Bhat' },
            { type: 'paragraph', text: 'Dal Bhat is more than just a meal; it\'s a reflection of Nepali culture and hospitality. It\'s a dish that brings families together and sustains people through their daily lives, whether in the bustling cities or the remote mountain villages. Dal Bhat is a culinary tradition deeply ingrained in Nepali society.' },
            { type: 'heading', level: 2, text: 'Things to Know About Dal Bhat' },
            {
              type: 'list', items: [
                '<strong>Nutritious:</strong> A balanced meal providing carbohydrates, protein, and essential nutrients.',
                '<strong>Versatile:</strong> Can be accompanied by a variety of vegetable curries, pickles, and sometimes meat or fish.',
                '<strong>Widely Available:</strong> Found in almost every restaurant and household across Nepal.',
              ]
            },
            { type: 'heading', level: 2, text: 'Enjoying Dal Bhat in Nepal' },
            { type: 'paragraph', text: 'When you visit Nepal, be sure to try Dal Bhat. It\'s not just food; it\'s an experience that connects you to the local culture and provides the energy you need for your adventures, whether you\'re trekking in the Himalayas or exploring the Kathmandu Valley.' },
          ],
        },
        {
          itineraryId: 5,
          slug: 'momo-making-class-kathmandu',
          title: 'Unlock the Secrets of Delicious Nepali Momos in Kathmandu',
          coverImage: momomaking,
          author: 'Kathmandu Cooking School',
          date: 'May 9, 2025',
          categories: [{ name: 'Food', slug: 'food' }, { name: 'Cooking Class', slug: 'cooking-class' }],
          tags: ['Nepal', 'Kathmandu', 'Momo', 'Cooking'],
          fullContent: [
            { type: 'paragraph', text: 'Learn the art of making traditional Nepali momos, delicious steamed dumplings filled with savory ingredients. Joining a local cooking class in Kathmandu offers a hands-on cultural experience, much like learning about the unique traditions of the Trunyan community.' },
            { type: 'heading', level: 2, text: 'What You\'ll Learn:' },
            {
              type: 'list', items: [
                '<strong>Making the perfect dough:</strong> Discover the simple ingredients and techniques for a tender momo wrapper.',
                '<strong>Preparing various fillings:</strong> Learn to create classic vegetable, chicken, and buff (water buffalo) fillings with aromatic spices.',
                '<strong>Shaping different styles:</strong> Master various folding techniques to create visually appealing momos.',
                '<strong>Steaming to perfection:</strong> Understand the timing and method for cooking momos to juicy tenderness.',
                '<strong>Making traditional dipping sauces (achar):</strong> Learn to prepare the spicy and tangy tomato or sesame seed-based dipping sauces that complement momos perfectly.',
              ]
            },
            { type: 'image', url: momoingredients, alt: 'Ingredients for making Nepali momos', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
            { type: 'heading', level: 2, text: 'Class Experience:' },
            { type: 'paragraph', text: 'Our hands-on cooking class starts with an introduction to the ingredients and the cultural significance of momos in Nepal. You\'ll get to prepare your own dough and fillings, practice different folding methods under the guidance of an experienced instructor, and finally, enjoy the delicious momos you\'ve made.' },
            { type: 'image', url: foldingmomo, alt: 'Hands-on momo folding lesson', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
            { type: 'paragraph', text: 'It\'s a fun and interactive way to experience Nepali cuisine and take home a valuable culinary skill, offering a different kind of adventure than a trek but an enriching cultural one nonetheless.' },
            { type: 'heading', level: 2, text: 'Optional: Momo Recipe (for home practice)' },
            { type: 'heading', level: 3, text: 'Ingredients:' },
            {
              type: 'list', items: [
                '2 cups all-purpose flour',
                '1/2 cup water',
                '1 tbsp vegetable oil',
                'Salt to taste',
                'For the filling (example - chicken):',
                '250g ground chicken',
                '1 small onion, finely chopped',
                '2 cloves garlic, minced',
                '1 inch ginger, grated',
                '1/2 tsp turmeric powder',
                '1/2 tsp cumin powder',
                '1/4 tsp red chili powder (optional)',
                'Fresh coriander leaves, chopped',
                'Salt and pepper to taste',
              ]
            },
            { type: 'heading', level: 3, text: 'Instructions:' },
            {
              type: 'list', items: [
                '<strong>Make the dough:</strong> In a large bowl, mix the flour and salt. Gradually add water and oil, kneading until you form a smooth and firm dough. Cover and let it rest for 30 minutes.',
                '<strong>Prepare the filling:</strong> In another bowl, combine the ground chicken, chopped onion, minced garlic, grated ginger, turmeric powder, cumin powder, red chili powder (if using), chopped coriander leaves, salt, and pepper. Mix well.',
                '<strong>Shape the momos:</strong> Divide the mockPosts into small balls. Roll each ball into a thin circle. Place a spoonful of the filling in the center of the circle. Bring the edges together to create your desired momo shape (e.g., crescent, round).',
                '<strong>Steam the momos:</strong> Grease a steamer basket and arrange the momos in it, leaving some space between them. Fill the bottom pot of the steamer with water and bring it to a boil. Place the steamer basket over the boiling water, cover, and steam for 15-20 minutes, or until the momos are cooked through.',
                '<strong>Serve:</strong> Serve the hot momos with your favorite Nepali dipping sauce (achar).',
              ]
            },
            { type: 'paragraph', text: 'Taking a momo-making class in Kathmandu is a delicious way to connect with Nepali culture and learn a skill you can take home and share with friends and family.' },
          ],
        },
        {
          itineraryId: 6,
          slug: 'newari-food-experience',
          title: 'A Culinary Journey Through Newari Cuisine',
          coverImage: newaricuisine,
          author: 'Newari Food Heritage',
          date: 'May 6, 2025',
          categories: [{ name: 'Food', slug: 'food' }, { name: 'Culture', slug: 'culture' }],
          tags: ['Nepal', 'Newari Food', 'Kathmandu Valley', 'Cuisine'],
          fullContent: [
            { type: 'paragraph', text: 'Embark on a culinary journey through the unique and flavorful dishes of the Newari people, the indigenous community of the Kathmandu Valley. Exploring Newari cuisine offers a taste of Nepal\'s rich cultural diversity.' },
            { type: 'heading', level: 2, text: 'Must-Try Newari Dishes:' },
            {
              type: 'list', items: [
                '<strong>Momocha:</strong> Steamed dumplings, often with a spicy dipping sauce, a Newari staple similar to the momos enjoyed across Nepal.',
                '<strong>Bara:</strong> Savory lentil patties, often spiced with ginger, garlic, and chili. A delicious and nutritious snack.',
                '<strong>Chatamari:</strong> A thin rice flour crepe, often topped with minced meat, vegetables, or eggs, sometimes referred to as "Newari pizza."',
                '<strong>Yomari:</strong> Steamed dumplings filled with sweet molasses and sesame seeds, traditionally made during the Yomari Punhi festival.',
                '<strong>Dhindo:</strong> A traditional porridge made from buckwheat or millet flour, often served with lentil soup and vegetable curries.',
                '<strong>Juju Dhau:</strong> Sweetened yogurt, a specialty of Bhaktapur, known for its creamy texture and unique flavor.',
                '<strong>Buff (Buffalo) Items:</strong> Newari cuisine features various flavorful buffalo meat preparations like "Choila" (spicy marinated grilled buffalo meat) and "Sanya Khuna" (jellied fish soup, sometimes made with buffalo tongue).',
                '<strong>Achar (Pickles):</strong> A wide variety of tangy and spicy pickles made from vegetables, fruits, and spices, an essential part of the Newari meal.',
                '<strong>Tongba:</strong> A traditional millet-based alcoholic beverage, often enjoyed during social gatherings and festivals.',
              ]
            },
            { type: 'image', url: newariplatter, alt: 'A platter of various Newari dishes', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
            { type: 'heading', level: 2, text: 'Experiencing Newari Food' },
            { type: 'paragraph', text: 'To truly experience Newari cuisine, venture into the old city areas of Kathmandu, Patan, and Bhaktapur, where traditional Newari restaurants and eateries abound. Look for local "bhattis" (small traditional restaurants) that serve authentic Newari dishes. Participating in a Newari cooking class can also provide a deeper understanding of the ingredients and preparation methods.' },
            { type: 'image', url: cookingnewaridishes, alt: 'Learning to cook Newari dishes', style: { maxWidth: '80%', height: 'auto', marginBottom: '15px' } },
            { type: 'heading', level: 2, text: 'The Cultural Significance' },
            { type: 'paragraph', text: 'Newari food is deeply intertwined with the culture and traditions of the Newari community. Many dishes have ritualistic significance and are prepared during festivals and special occasions. Sharing a Newari meal is often a communal experience, reflecting the strong social bonds within the community.' },
            { type: 'paragraph', text: 'Embark on this culinary adventure to savor the unique flavors and experience the rich cultural heritage of the Newari people, a vital part of Nepal\'s diverse tapestry.' },
          ],
        },
        {
          itineraryId: 7,
          slug: 'hiking-everest-region',
          title: 'Breathtaking Hikes in the Everest Region',
          coverImage: everestregion,
          author: 'Everest Trekking Guides',
          date: 'May 4, 2025',
          categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Hiking', slug: 'hiking' }],
          tags: ['Nepal', 'Everest', 'Himalayas', 'Trekking'],
          fullContent: [
            { type: 'paragraph', text: 'Discover stunning trails with unparalleled views of the world\'s highest peaks in the Everest region of Nepal. Trekking in the Everest region offers an unforgettable experience amidst the majestic Himalayas.' },
            { type: 'heading', level: 2, text: 'Popular Hikes:' },
            {
              type: 'list', items: [
                '<strong>Everest Base Camp Trek:</strong> The classic trek to the foot of Mount Everest, offering breathtaking scenery and a profound sense of accomplishment.',
                { type: 'image', url: everesttrek, alt: 'Trekkers on the Everest Base Camp trail', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
                '<strong>Gokyo Lakes Trek:</strong> Explore the beautiful turquoise Gokyo Lakes and enjoy panoramic mountain views, including Everest, Lhotse, Makalu, and Cho Oyu.',
                { type: 'image', url: gokyolake, alt: 'Turquoise Gokyo Lakes with Himalayan peaks', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
                '<strong>Pikey Peak Trek:</strong> Offers stunning views of Everest and other Himalayan giants without the high altitude and longer duration of the EBC trek.',
                { type: 'image', url: pikeypeak, alt: 'Panoramic view of Everest from Pikey Peak', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
                '<strong>Short Everest View Treks:</strong> Ideal for those with limited time, these treks provide excellent views of the Everest range from viewpoints like Namche Bazaar and Tengboche Monastery.',
                { type: 'image', url: shorttrek, alt: 'View of Everest from a shorter trek viewpoint', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
              ]
            },
            { type: 'heading', level: 2, text: 'Experiencing the Everest Region' },
            { type: 'paragraph', text: 'Trekking in the Everest region is not just about the mountains; it\'s also an opportunity to experience the unique Sherpa culture, visit ancient monasteries, and witness the resilience of the local communities living in this challenging environment. The warmth and hospitality of the Sherpa people are a highlight of any trek in this region.' },
            { type: 'heading', level: 2, text: 'Things to Know Before You Go' },
            {
              type: 'list', items: [
                '<strong>Difficulty:</strong> Varies from moderate to strenuous depending on the trek.',
                '<strong>Duration:</strong> From a few days to several weeks.',
                '<strong>Altitude Sickness:</strong> A significant concern; proper acclimatization is essential.',
                '<strong>Permits:</strong> You will need a Sagarmatha National Park permit and a TIMS card.',
              ]
            },
            { type: 'heading', level: 2, text: 'What to Bring' },
            {
              type: 'list', items: [
                'High-quality trekking gear suitable for high altitudes and varying weather conditions.',
                'Warm layers, including a down jacket and thermal wear.',
                'Sturdy trekking boots.',
                'Altitude sickness medication (consult your doctor).',
              ]
            },
            { type: 'paragraph', text: 'Hiking in the Everest region is an adventure of a lifetime, offering unparalleled natural beauty and a chance to connect with the majestic Himalayas and the unique Sherpa culture.' },
          ],
        },
        {
          itineraryId: 8,
          slug: 'exploring-bardia-national-park',
          title: 'Wildlife Encounters in Bardia National Park',
          coverImage: bardianationalpark,
          author: 'Bardia Wildlife Experts',
          date: 'May 7, 2025',
          categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Wildlife Safari', slug: 'wildlife-safari' }],
          tags: ['Nepal', 'Bardia', 'Wildlife', 'Safari'],
          fullContent: [
            { type: 'paragraph', text: 'Embark on a jungle safari in Bardia National Park, home to diverse wildlife including rhinos, tigers, elephants, and numerous bird species. This experience offers a different kind of natural immersion, focusing on wildlife observation in Nepal\'s Terai region.' },
            { type: 'heading', level: 2, text: 'Wildlife Activities:' },
            {
              type: 'list', items: [
                '<strong>Jeep Safari:</strong> Explore the park\'s trails in an open jeep for the best wildlife viewing opportunities. Experienced guides will help you spot animals and interpret the jungle\'s signs.',
                { type: 'image', url: jeepsafari, alt: 'Jeep safari in Bardia National Park', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
                '<strong>Elephant-back Safari:</strong> A unique way to get close to rhinos and other large mammals while traversing through the tall grasslands.',
                { type: 'image', url: elephantsafaribardiya, alt: 'Elephant-back safari for rhino spotting in Bardia', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
                '<strong>Jungle Walk:</strong> Guided walks through the forest provide opportunities to spot birds, smaller wildlife, and learn about the park\'s ecosystem up close.',
                { type: 'image', url: junglewalkbardia, alt: 'Guided jungle walk in Bardia', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
                '<strong>Canoe Ride:</strong> Explore the rivers and look for crocodiles, gharials, and various aquatic bird species. The peaceful glide along the water offers a different perspective of the park.',
                { type: 'image', url: canoebardia, alt: 'Canoe ride on a river in Bardia', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
              ]
            },
            { type: 'heading', level: 2, text: 'Experiencing Bardia\'s Culture' },
            { type: 'paragraph', text: 'Bardia also offers opportunities to interact with the local Tharu community. Visit Tharu villages, witness their traditional dances, and learn about their unique way of life, which is deeply connected to the surrounding jungle.' },
            { type: 'image', url: tharuvillage, alt: 'Tharu village in the Bardia region', style: { maxWidth: '100%', height: 'auto', marginBottom: '15px' } },
            { type: 'heading', level: 2, text: 'Things to Know Before You Go' },
            {
              type: 'list', items: [
                '<strong>Best Time to Visit:</strong> October to April for pleasant weather and good wildlife sightings.',
                '<strong>Accommodation:</strong> Options range from comfortable lodges to basic guesthouses.',
                '<strong>Safety:</strong> Always follow your guide\'s instructions and be aware of wildlife.',
                '<strong>Malaria Prevention:</strong> Consult your doctor about necessary precautions.',
              ]
            },
            { type: 'heading', level: 2, text: 'What to Bring' },
            {
              type: 'list', items: [
                'Lightweight and breathable clothing in neutral colors.',
                'Sturdy walking shoes or boots.',
                'Insect repellent.',
                'Sunscreen, hat, and sunglasses.',
                'Binoculars for wildlife viewing.',
                'Camera with a good zoom lens.',
              ]
            },
            { type: 'paragraph', text: 'Discover the natural beauty and incredible wildlife of Bardia National Park, a hidden gem in Nepal\'s Terai region offering a unique safari experience.' },
          ],
        },
        {
          itineraryId: 9,
          slug: 'phewa-lake-boating-pokhara',
          title: 'Tranquil Boating on Phewa Lake in Pokhara',
          coverImage: tranquilboating,
          author: 'Pokhara Lakeside Adventures',
          date: 'May 9, 2025',
          categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Boating', slug: 'boating' }],
          tags: ['Nepal', 'Pokhara', 'Lake', 'Boating'],
          fullContent: [
            { type: 'paragraph', text: 'Enjoy the serenity of Phewa Lake with a relaxing boat ride and stunning reflections of the Annapurna mountains. Boating on Phewa Lake offers a tranquil way to connect with nature and admire the stunning scenery of Pokhara.' },
            { type: 'heading', level: 2, text: 'Things to See on Phewa Lake:' },
            {
              type: 'list', items: [
                { type: 'text', content: '<strong>Tal Barahi Temple:</strong> A beautiful Hindu temple located on a small island in the middle of the lake. Rent a boat to visit this iconic shrine.' },
                { type: 'image', url: taalbarahi, alt: 'Tal Barahi Temple on Phewa Lake', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
                { type: 'text', content: '<strong>Begnas Lake and Rupa Lake:</strong> Two other picturesque lakes located a short drive from Pokhara, offering a more secluded boating experience.' },
                { type: 'image', url: begnaslake, alt: 'Scenic view of Begnas or Rupa Lake', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
                { type: 'text', content: '<strong>World Peace Pagoda:</strong> Hike or take a boat and then a short climb to reach this hilltop pagoda offering panoramic views of Phewa Lake, Pokhara city, and the Annapurna range.' },
                { type: 'image', url: worldpeacepagoda, alt: 'World Peace Pagoda overlooking Phewa Lake', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
                { type: 'text', content: '<strong>Boating and Kayaking:</strong> Rent a colorful paddleboat or a kayak and explore the lake at your own pace. Enjoy the peaceful atmosphere and the reflections of the surrounding hills and mountains on the water.' },
                { type: 'image', url: boatsonphewa, alt: 'Colorful boats on Phewa Lake', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
                { type: 'text', content: '<strong>Phewa Lake Shoreline:</strong> Stroll along the lakeside promenade, enjoy the vibrant atmosphere, browse the shops, and dine at the many restaurants offering views of the lake.' },
                { type: 'image', url: lakeside, alt: 'Lakeside promenade in Pokhara', style: { maxWidth: '90%', height: 'auto', marginBottom: '15px' } },
              ]
            },
            { type: 'heading', level: 2, text: 'Experiencing Phewa Lake' },
            { type: 'paragraph', text: 'Boating on Phewa Lake is a quintessential Pokhara experience. Whether you\'re seeking tranquility, stunning views, or a visit to a cultural site like the Tal Barahi Temple, the lake offers something for everyone. The serene ambiance and the backdrop of the majestic Annapurna range create a truly unforgettable experience.' },
            { type: 'heading', level: 2, text: 'Things to Know Before You Go' },
            {
              type: 'list', items: [
                { type: 'text', content: '<strong>Boat Rentals:</strong> Easily available along the lakeside. Negotiate the price before renting.' },
                { type: 'text', content: '<strong>Safety:</strong> Wear a life jacket, especially if you are not a strong swimmer.' },
                { type: 'text', content: '<strong>Best Time for Boating:</strong> Early morning or late afternoon for calm waters and beautiful light.' },
              ]
            },
            { type: 'heading', level: 2, text: 'What to Bring' },
            {
              type: 'list', items: [
                { type: 'text', content: 'Comfortable clothing.' },
                { type: 'text', content: 'Sunscreen, hat, and sunglasses.' },
                { type: 'text', content: 'Camera to capture the scenic views.' },
                { type: 'text', content: 'Water to stay hydrated.' },
              ]
            },
            { type: 'paragraph', text: 'A boat ride on Phewa Lake offers a relaxing and scenic escape, a perfect complement to the more adventurous activities Nepal has to offer.' },
          ],
        },
      ];

      const foundPost = mockPosts.find((p) => p.slug === slug);

      if (foundPost) {
        setPost(foundPost);
        console.log("Full Content:", foundPost.fullContent);
      } else {
        setError('Post not found');
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return <div>Loading blog post...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Header />
      <div className="blog-post-page">
        <div className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>By {post.author}</span>
            <span>|</span>
            <span>{post.date}</span>
            {post.categories && post.categories.length > 0 && (
              <div className="post-categories">
                <strong>Categories:</strong>
                {post.categories.map((cat) => (
                  <Link key={cat.slug} to={`/category/${cat.slug}`} className="category-link">
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <img src={post.coverImage} alt={post.title} className="cover-image" />
        <div className="post-content">
          {post.fullContent.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === 'paragraph' && <p>{item.text}</p>}
              {item.type === 'heading' && item.level === 2 && <h2>{item.text}</h2>}
              {item.type === 'heading' && item.level === 3 && <h3>{item.text}</h3>}
              {item.type === 'image' && <img src={item.url} alt={item.alt} style={item.style} />}
              {item.type === 'list' && (
                <ul>
                  {item.items.map((listItem, i) => (
                    <li key={i}>
                      {listItem.type === 'text' ? (
                        <span dangerouslySetInnerHTML={{ __html: listItem.content }} />
                      ) : listItem.type === 'image' ? (
                        <img src={listItem.url} alt={listItem.alt} style={listItem.style} />
                      ) : (
                        <span dangerouslySetInnerHTML={{ __html: listItem }} />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          {post.categories && post.categories.length > 0 && (
            <>
              <Link to={`/category/${post.categories[0].slug}`}>{post.categories[0].name}</Link>
            </>
          )}
          <span>{post.title}</span>
        </div>
        <CommentSection itineraryId={post.itineraryId || 'default'} />
      </div>
      <Footer />
    </>
  );
}

export default BlogPostPage;