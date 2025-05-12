 import React, { useState, useEffect } from 'react';
 import { useParams, Link } from 'react-router-dom';
 import './BlogPostPage.css';
 import annapurnaBaseCamp from './images/annapurnabasecamp.jpg';
 import kathmanduvalley from './images/kathmanduvalley.jpg';
 import chitwannationalpark from './images/chitwannationalpark.jpg';
 import daalbhat from './images/daalbhat.jpg';
 import momomaking from './images/momomaking.jpg';
 import newaricuisine from './images/newaricuisine.jpg';
  

 function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   setTimeout(() => {
    const mockPosts = [
  {
   slug: 'annapurna-base-camp-trek',
      title: 'Discover the Wonders of the Annapurna Base Camp Trek',
      coverImage: annapurnaBaseCamp,
      author: 'Adventure Nepal Team',
      date: 'May 5, 2025',
   categories: [{ name: 'Adventure', slug: 'adventure' }, { name: 'Trekking', slug: 'trekking' }],
   tags: ['Nepal', 'Himalayas', 'Trekking', 'Annapurna'],
   fullContent: `
     <p>Embark on an unforgettable journey to the Annapurna Base Camp (ABC) Trek, a classic Himalayan adventure that takes you through diverse landscapes and offers breathtaking mountain views. Inspired by the scenic Trunyan Hill hike, this trek provides a similar sense of awe and accomplishment.</p>

     <h2>Getting to the Annapurna Region</h2>
     <p>The adventure typically begins with a flight to Pokhara, a beautiful lakeside city and the gateway to the Annapurna region. Upon arrival in Pokhara, you'll be greeted by stunning views of the Annapurna range (weather permitting!). The journey continues with a scenic drive to one of the starting points of the trek, such as Nayapul or Phedi.</p>
     <img src="/images/pokhara_arrival.jpg" alt="Arrival in Pokhara with Annapurna views" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>Similar to the journey to Trunyan, the initial travel involves immersing yourself in the local culture and preparing for the trek ahead. Pokhara itself offers opportunities to explore serene lakes and bustling markets before heading into the mountains.</p>

     <h2>The Trek to Base Camp</h2>
     <p>The trail winds through charming villages inhabited by the welcoming Gurung communities, lush rhododendron forests that burst into color during spring, and alongside glacial rivers carving their way through the valleys. Each day of the trek unveils new vistas, from terraced fields to cascading waterfalls, with the majestic snow-capped peaks constantly in view.</p>
     <img src="/images/annapurna_trail.jpg" alt="Trekking trail through rhododendron forest in Annapurna region" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>As you ascend, the air gets crisper, and the landscape transforms, offering increasingly dramatic views of iconic mountains like Machhapuchhre (Fishtail) and Annapurna South. The feeling of walking amidst these giants is truly awe-inspiring, much like the panoramic views experienced from Trunyan Hill, albeit on a grander scale.</p>

     <h2>Reaching Annapurna Base Camp</h2>
     <p>Arriving at the Annapurna Base Camp (4,130 meters / 13,550 feet) is a profoundly rewarding experience. Surrounded by towering peaks like Annapurna I, Annapurna South, Hiunchuli, and the iconic Machhapuchhre, you'll feel a deep sense of connection with the raw power and beauty of the Himalayas. The base camp itself is a small settlement nestled amongst these giants, offering unparalleled photographic opportunities, especially at sunrise and sunset.</p>
     <img src="/images/annapurna_base_camp.jpg" alt="Annapurna Base Camp surrounded by snow-capped mountains" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>The feeling of accomplishment upon reaching ABC mirrors the satisfaction of reaching the summit of Trunyan Hill, with the majestic mountain scenery serving as an unforgettable reward for your efforts.</p>

     <h2>Things to Know Before You Go</h2>
     <ul>
       <li><strong>Difficulty:</strong> Moderate to strenuous. Requires a good level of fitness and some trekking experience is recommended.</li>
       <li><strong>Duration:</strong> Typically 7-10 days, depending on the specific itinerary and acclimatization days.</li>
       <li><strong>Best Time to Trek:</strong> Spring (March-May) and Autumn (September-November) offer the most stable weather and clear mountain views.</li>
       <li><strong>Altitude Sickness:</strong> Gradual ascent and allowing for acclimatization days are crucial to prevent altitude sickness. Stay hydrated and listen to your body.</li>
       <li><strong>Permits:</strong> You will need an Annapurna Conservation Area Permit (ACAP) and a Trekkers' Information Management System (TIMS) card, which can be obtained in Kathmandu or Pokhara.</li>
     </ul>

     <h2>What to Bring</h2>
     <ul>
       <li>Sturdy, well-broken-in trekking boots with good ankle support.</li>
       <li>Warm layers of clothing, including thermal base layers, fleece jackets, and a down jacket.</li>
       <li>Waterproof and windproof outer jacket and trousers.</li>
       <li>A comfortable sleeping bag (depending on the teahouse accommodation).</li>
       <li>Sunscreen, a wide-brimmed hat, and UV protection sunglasses.</li>
       <li>A basic first-aid kit with personal medications.</li>
       <li>Plenty of water bottles or a hydration pack, and water purification tablets or a filter.</li>
       <li>Energy snacks like nuts, dried fruits, and energy bars.</li>
       <li>A headlamp or flashlight with extra batteries.</li>
       <li>Trekking poles (optional, but highly recommended for stability).</li>
     </ul>

     <p>The Annapurna Base Camp Trek, while more extensive and challenging than the Trunyan Hill hike, offers a similar opportunity to deeply immerse yourself in the breathtaking beauty of nature and challenge yourself physically. The memories and panoramic views of the world's highest mountains gained on this trek will undoubtedly last a lifetime.</p>
   `,
  },
  {
   slug: 'kathmandu-valley-cultural-tour',
   title: 'Immerse Yourself in the Rich Culture of Kathmandu Valley',
   coverImage: kathmanduvalley,
   author: 'Nepal Cultural Expeditions',
   date: 'May 8, 2025',
   categories: [{ name: 'Culture', slug: 'culture' }, { name: 'Cultural Tours', slug: 'cultural-tours' }],
   tags: ['Nepal', 'Kathmandu', 'Temples', 'Tradition'],
   fullContent: `
     <p>Embark on a captivating cultural tour of the Kathmandu Valley, a UNESCO World Heritage site brimming with ancient temples, intricate palaces, and vibrant traditions. This journey, while different from the natural immersion of the Trunyan Hill hike, offers a deep dive into Nepal's rich historical and artistic heritage.</p>

     <h2>Day 1: Kathmandu Durbar Square</h2>
     <p>Begin your exploration at Kathmandu Durbar Square, a complex of palaces, courtyards, and temples that showcase the exquisite Newari architecture. Witness the Kumari Ghar, home to the living goddess, and explore the historical narratives etched in stone and wood.</p>
     <img src="/images/kathmandu_durbar_square.jpg" alt="Kathmandu Durbar Square with ancient temples" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>Similar to discovering the local life around Trunyan, wandering through the Durbar Square provides a glimpse into the daily rhythms and cultural practices of the Kathmandu residents.</p>

     <h2>Day 2: Swayambhunath & Boudhanath</h2>
     <p>Discover the iconic Swayambhunath Stupa, perched atop a hill offering panoramic views of Kathmandu Valley. This ancient stupa, adorned with the watchful eyes of Buddha, is a significant Buddhist site. Later, visit Boudhanath Stupa, one of the largest spherical stupas in Nepal, surrounded by monasteries and prayer wheels.</p>
     <img src="/images/boudhanath_stupa.jpg" alt="Boudhanath Stupa with prayer flags" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>The serene atmosphere and spiritual energy of these sites offer a different kind of uplifting experience compared to the physical exertion of the Trunyan hike.</p>

     <h2>Day 3: Pashupatinath & Bhaktapur Durbar Square</h2>
     <p>Visit Pashupatinath Temple, a sacred Hindu temple dedicated to Lord Shiva, located on the banks of the Bagmati River. Observe the traditional cremation ceremonies (from a respectful distance). In the afternoon, travel to Bhaktapur Durbar Square, a well-preserved ancient city showcasing medieval Newari art and architecture.</p>
     <img src="/images/bhaktapur_durbar_square.jpg" alt="Bhaktapur Durbar Square with traditional buildings" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>Exploring the historical streets and artistic details of Bhaktapur offers a sense of stepping back in time, a different kind of exploration than the natural trails of Trunyan.</p>

     <h2>Day 4: Patan Durbar Square & Departure</h2>
     <p>Explore Patan Durbar Square, another architectural gem in the Kathmandu Valley, renowned for its fine arts and crafts. Visit the Patan Museum, housed in a former palace, to admire the exquisite metalwork and sculptures. Depending on your departure schedule, you might have time for some souvenir shopping.</p>
     <img src="/images/patan_durbar_square.jpg" alt="Patan Durbar Square with intricate carvings" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>This cultural tour provides a deep insight into the rich heritage and artistic traditions of Nepal, offering a different yet equally enriching experience compared to the natural beauty encountered during a hike like Trunyan Hill.</p>

     <h2>Things to Know Before You Go</h2>
     <ul>
       <li><strong>Duration:</strong> Typically 3-4 days.</li>
       <li><strong>Best Time to Visit:</strong> Spring (March-May) and Autumn (September-November) for pleasant weather.</li>
       <li><strong>Respectful Dress:</strong> Dress modestly when visiting religious sites (shoulders and knees covered).</li>
       <li><strong>Guides:</strong> Hiring a local guide can enhance your understanding of the history and culture.</li>
     </ul>

     <h2>What to Bring</h2>
     <ul>
       <li>Comfortable walking shoes.</li>
       <li>Lightweight and breathable clothing.</li>
       <li>Sunscreen, hat, and sunglasses.</li>
       <li>A light jacket or sweater for cooler evenings.</li>
       <li>A small backpack for essentials.</li>
       <li>Camera to capture the historical sites.</li>
     </ul>

     <p>This cultural tour of the Kathmandu Valley offers a fascinating contrast to the natural beauty of hikes like Trunyan Hill, providing a profound appreciation for Nepal's rich history, art, and traditions.</p>
   `,
  },
  {
   slug: 'chitwan-national-park-nature-safari',
   title: 'Experience Wildlife and Nature in Chitwan National Park',
   coverImage: chitwannationalpark,
   author: 'Wildlife Safaris Nepal',
   date: 'May 10, 2025',
   categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Wildlife Safari', slug: 'wildlife-safari' }],
   tags: ['Nepal', 'Chitwan', 'Safari', 'Wildlife'],
   fullContent: `
     <p>Embark on an exciting nature safari in Chitwan National Park, Nepal's first national park and a UNESCO World Heritage site. This adventure, while focused on wildlife encounters rather than hiking, shares the spirit of exploration and natural discovery found in places like Trunyan Hill.</p>

     <h2>Day 1: Arrival in Chitwan & Jungle Activities</h2>
     <p>Arrive in Chitwan and settle into your jungle lodge. Begin your wildlife adventure with activities like a guided nature walk, where you can learn about the park's diverse flora and fauna, and a visit to a Tharu village to experience the local culture.</p>
     <img src="/images/chitwan_jungle_walk.jpg" alt="Jungle walk in Chitwan National Park" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>Similar to observing the unique traditions in Trunyan, interacting with the local Tharu community provides cultural insights into the region surrounding the national park.</p>

     <h2>Day 2: Canoe Ride & Elephant Safari</h2>
     <p>Enjoy a peaceful canoe ride along the Rapti River, providing excellent opportunities to observe aquatic birds, crocodiles, and other wildlife along the riverbanks. In the afternoon, experience a unique elephant-back safari, venturing deeper into the jungle for a chance to spot rhinos and possibly even tigers.</p>
     <img src="/images/chitwan_elephant_safari.jpg" alt="Elephant safari in Chitwan for wildlife viewing" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>The thrill of encountering wildlife in their natural habitat offers a different kind of excitement compared to the scenic rewards of a hike like Trunyan Hill.</p>

     <h2>Day 3: Bird Watching & Cultural Program</h2>
     <p>Chitwan is a paradise for bird watchers, with over 500 species recorded. Spend the morning exploring different habitats with a knowledgeable guide. In the evening, enjoy a traditional Tharu cultural dance performance showcasing their unique customs and heritage.</p>
     <img src="/images/tharu_dance_chitwan.jpg" alt="Traditional Tharu dance performance in Chitwan" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>The cultural program offers another layer of understanding the local context, similar to the cultural elements one might encounter when visiting the area around Trunyan.</p>

     <h2>Day 4: Departure</h2>
     <p>After breakfast, enjoy a final opportunity for wildlife viewing or a nature walk before departing from Chitwan, carrying memories of incredible wildlife encounters and the serene beauty of the Terai region.</p>
     <p>A nature safari in Chitwan National Park offers a thrilling and immersive experience in Nepal's natural wonders, providing a different kind of adventure than the mountainous landscapes of Trunyan Hill.</p>

     <h2>Things to Know Before You Go</h2>
     <ul>
       <li><strong>Duration:</strong> Typically 3-4 days.</li>
       <li><strong>Best Time to Visit:</strong> October to March for pleasant weather and good wildlife viewing.</li>
       <li><strong>Malaria Prevention:</strong> Consult your doctor about malaria precautions for the Terai region.</li>
       <li><strong>Park Regulations:</strong> Follow the guidelines provided by your guide and the park authorities.</li>
     </ul>

     <h2>What to Bring</h2>
     <ul>
       <li>Lightweight and comfortable clothing in neutral colors.</li>
       <li>Sturdy walking shoes or boots.</li>
       <li>Insect repellent.</li>
       <li>Sunscreen, hat, and sunglasses.</li>
       <li>Binoculars for wildlife viewing.</li>
       <li>Camera with a good zoom lens.</li>
     </ul>

     <p>A wildlife safari in Chitwan National Park provides an unforgettable opportunity to connect with nature and witness incredible wildlife, offering a unique adventure in the heart of Nepal.</p>
   `,
  },
  {
  slug: 'nepali-dal-bhat-recipe',
  title: 'The Heart of Nepali Cuisine: Mastering Dal Bhat',
  coverImage: daalbhat,
  author: 'Nepali Food Blog',
  date: 'May 7, 2025',
  categories: [{ name: 'Food', slug: 'food' }, { name: 'Culture', slug: 'culture' }],
  tags: ['Nepal', 'Nepali Food', 'Recipe', 'Dal Bhat'],
  fullContent: `
    <p>Dal Bhat is the national dish of Nepal, a staple meal enjoyed by people across the country. While not an adventure in the traditional sense like the Trunyan Hill hike, understanding and even mastering this dish offers a cultural journey into the heart of Nepali life.</p>

    <h2>Ingredients:</h2>
    <ul>
      <li>1 cup lentils (masoor dal, moong dal, or a mix)</li>
      <li>2 cups rice</li>
      <li>2 tbsp cooking oil</li>
      <li>1 onion, finely chopped</li>
      <li>2 cloves garlic, minced</li>
      <li>1 inch ginger, grated</li>
      <li>1 tsp turmeric powder</li>
      <li>1 tsp cumin powder</li>
      <li>1/2 tsp coriander powder</li>
      <li>Salt to taste</li>
      <li>Water as needed</li>
      <li>Optional: Vegetables for Tarkari (curry), Achar (pickle)</li>
    </ul>
    <img src="/images/dal_bhat_ingredients.jpg" alt="Ingredients for Nepali Dal Bhat" style="max-width: 100%; height: auto; margin-bottom: 15px;" />

    <h2>Instructions:</h2>
    <ol>
      <li><strong>Wash the lentils:</strong> Thoroughly rinse the lentils under cold water until the water runs clear. Soak them for at least 30 minutes.</li>
      <li><strong>Cook the rice:</strong> Prepare the rice according to your preferred method (boiling, steaming, or using a rice cooker).</li>
      <li><strong>Sauté the aromatics:</strong> Heat oil in a pot over medium heat. Add the chopped onion and sauté until golden brown. Then, add the minced garlic and grated ginger and cook for another minute until fragrant.</li>
      <li><strong>Add spices and lentils:</strong> Stir in the turmeric powder, cumin powder, and coriander powder. Add the soaked lentils and water (about 3-4 cups). Bring the mixture to a boil, then reduce the heat and simmer gently until the lentils are cooked and mushy (about 20-30 minutes).</li>
      <li><strong>Season and adjust:</strong> Season the dal with salt to taste. If the consistency is too thick, add more water. Simmer for a few more minutes.</li>
      <li><strong>Prepare Tarkari and Achar (optional):</strong> While the dal and bhat are cooking, prepare vegetable curries (Tarkari) and Nepali pickles (Achar) to accompany the meal.</li>
      <li><strong>Serve hot:</strong> Ladle the dal into a bowl, serve the bhat alongside, and accompany with Tarkari and Achar. Enjoy the comforting and nutritious flavors of Nepal!</li>
    </ol>
    <img src="/images/dal_bhat_served.jpg" alt="Nepali Dal Bhat served with Tarkari and Achar" style="max-width: 100%; height: auto; margin-bottom: 15px;" />

    <h2>The Cultural Significance of Dal Bhat</h2>
    <p>Dal Bhat is more than just a meal; it's a reflection of Nepali culture and hospitality. It's a dish that brings families together and sustains people through their daily lives, whether in the bustling cities or the remote mountain villages. Just as the Trunyan community has its unique customs, Dal Bhat is a culinary tradition deeply ingrained in Nepali society.</p>

    <h2>Things to Know About Dal Bhat</h2>
    <ul>
      <li><strong>Nutritious:</strong> A balanced meal providing carbohydrates, protein, and essential nutrients.</li>
      <li><strong>Versatile:</strong> Can be accompanied by a variety of vegetable curries, pickles, and sometimes meat or fish.</li>
      <li><strong>Widely Available:</strong> Found in almost every restaurant and household across Nepal.</li>
    </ul>

    <h2>Enjoying Dal Bhat in Nepal</h2>
    <p>When you visit Nepal, be sure to try Dal Bhat. It's not just food; it's an experience that connects you to the local culture and provides the energy you need for your adventures, whether you're trekking in the Himalayas or exploring the Kathmandu Valley.</p>
  `,
 },
     {
      slug: 'momo-making-class-kathmandu',
   title: 'Unlock the Secrets of Delicious Nepali Momos in Kathmandu',
   coverImage: momomaking,
   author: 'Kathmandu Cooking School',
   date: 'May 9, 2025',
   categories: [{ name: 'Food', slug: 'food' }, { name: 'Cooking Class', slug: 'cooking-class' }],
   tags: ['Nepal', 'Kathmandu', 'Momo', 'Cooking'],
   fullContent: `
     <p>Learn the art of making traditional Nepali momos, delicious steamed dumplings filled with savory ingredients. Joining a local cooking class in Kathmandu offers a hands-on cultural experience, much like learning about the unique traditions of the Trunyan community.</p>

     <h2>What You'll Learn:</h2>
     <ul>
       <li><strong>Making the perfect dough:</strong> Discover the simple ingredients and techniques for a tender momo wrapper.</li>
       <li><strong>Preparing various fillings:</strong> Learn to create classic vegetable, chicken, and buff (water buffalo) fillings with aromatic spices.</li>
       <li><strong>Shaping different styles:</strong> Master various folding techniques to create visually appealing momos.</li>
       <li><strong>Steaming to perfection:</strong> Understand the timing and method for cooking momos to juicy tenderness.</li>
       <li><strong>Making traditional dipping sauces (achar):</strong> Learn to prepare the spicy and tangy tomato or sesame seed-based dipping sauces that complement momos perfectly.</li>
     </ul>
     <img src="/images/momo_ingredients.jpg" alt="Ingredients for making Nepali momos" style="max-width: 100%; height: auto; margin-bottom: 15px;" />

     <h2>Class Experience:</h2>
     <p>Our hands-on cooking class starts with an introduction to the ingredients and the cultural significance of momos in Nepal. You'll get to prepare your own dough and fillings, practice different folding methods under the guidance of an experienced instructor, and finally, enjoy the delicious momos you've made.</p>
     <img src="/images/momo_folding.jpg" alt="Hands-on momo folding lesson" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     <p>It's a fun and interactive way to experience Nepali cuisine and take home a valuable culinary skill, offering a different kind of adventure than a trek but an enriching cultural one nonetheless.</p>

     <h2>Optional: Momo Recipe (for home practice)</h2>
     <h3>Ingredients:</h3>
     <ul>
       <li>2 cups all-purpose flour</li>
       <li>1/2 cup water</li>
       <li>1 tbsp vegetable oil</li>
       <li>Salt to taste</li>
       <li>For the filling (example - chicken):</li>
       <li>250g ground chicken</li>
       <li>1 small onion, finely chopped</li>
       <li>2 cloves garlic, minced</li>
       <li>1 inch ginger, grated</li>
       <li>1/2 tsp turmeric powder</li>
       <li>1/2 tsp cumin powder</li>
       <li>1/4 tsp red chili powder (optional)</li>
       <li>Fresh coriander leaves, chopped</li>
       <li>Salt and pepper to taste</li>
     </ul>
     <img src="/images/chicken_momo_filling.jpg" alt="Chicken momo filling ingredients" style="max-width: 100%; height: auto; margin-bottom: 15px;" />

     <h3>Instructions:</h3>
     <ol>
       <li><strong>Make the dough:</strong> In a large bowl, mix the flour and salt. Gradually add water and oil, kneading until you form a smooth and firm dough. Cover and let it rest for 30 minutes.</li>
       <li><strong>Prepare the filling:</strong> In another bowl, combine the ground chicken, chopped onion, minced garlic, grated ginger, turmeric powder, cumin powder, red chili powder (if using), chopped coriander leaves, salt, and pepper. Mix well.</li>
       <li><strong>Shape the momos:</strong> Divide the dough into small balls. Roll each ball into a thin circle. Place a spoonful of the filling in the center of the circle. Bring the edges together to create your desired momo shape (e.g., crescent, round).</li>
       <li><strong>Steam the momos:</strong> Grease a steamer basket and arrange the momos in it, leaving some space between them. Fill the bottom pot of the steamer with water and bring it to a boil. Place the steamer basket over the boiling water, cover, and steam for 15-20 minutes, or until the momos are cooked through.</li>
       <li><strong>Serve:</strong> Serve the hot momos with your favorite Nepali dipping sauce (achar).</li>
     </ol>

     <p>Taking a momo-making class in Kathmandu is a delicious way to connect with Nepali culture and learn a skill you can take home and share with friends and family.</p>
   `,
  },
  {
   slug: 'newari-food-experience',
   title: 'A Culinary Journey Through Newari Cuisine',
   coverImage: newaricuisine,
   author: 'Newari Food Heritage',
   date: 'May 6, 2025',
   categories: [{ name: 'Food', slug: 'food' }, { name: 'Culture', slug: 'culture' }],
   tags: ['Nepal', 'Newari Food', 'Kathmandu Valley', 'Cuisine'],
   fullContent: `
     <p>Embark on a culinary journey through the unique and flavorful dishes of the Newari people, the indigenous community of the Kathmandu Valley. Similar to discovering the distinct culture of Trunyan, exploring Newari cuisine offers a taste of Nepal's rich cultural diversity.</p>

     <h2>Must-Try Newari Dishes:</h2>
     <ul>
       <li><strong>Momocha:</strong> Steamed dumplings, often with a spicy dipping sauce, a Newari staple similar to the momos enjoyed across Nepal.</li>
       <li><strong>Bara:</strong> Savory lentil patties, often spiced with ginger, garlic, and chili. A delicious and nutritious snack.</li>
       <li><strong>Chatamari:</strong> A thin rice flour crepe, often topped with minced meat, vegetables, or eggs, sometimes referred to as "Newari pizza."</li>
       <li><strong>Yomari:</strong> Steamed dumplings filled with sweet molasses and sesame seeds, traditionally made during the Yomari Punhi festival.</li>
       <li><strong>Dhindo:</strong> A traditional porridge made from buckwheat or millet flour, often served with lentil soup and vegetable curries.</li>
       <li><strong>Juju Dhau:</strong> Sweetened yogurt, a specialty of Bhaktapur, known for its creamy texture and unique flavor.</li>
       <li><strong>Buff (Buffalo) Items:</strong> Newari cuisine features various flavorful buffalo meat preparations like "Choila" (spicy marinated grilled buffalo meat) and "Sanya Khuna" (jellied fish soup, sometimes made with buffalo tongue).</li>
       <li><strong>Achar (Pickles):</strong> A wide variety of tangy and spicy pickles made from vegetables, fruits, and spices, an essential part of the Newari meal.</li>
       <li><strong>Tongba:</strong> A traditional millet-based alcoholic beverage, often enjoyed during social gatherings and festivals.</li>
     </ul>
     <img src="/images/newari_food_platter.jpg" alt="A platter of various Newari dishes" style="max-width: 100%; height: auto; margin-bottom: 15px;" />

     <h2>Experiencing Newari Food</h2>
     <p>To truly experience Newari cuisine, venture into the old city areas of Kathmandu, Patan, and Bhaktapur, where traditional Newari restaurants and eateries abound. Look for local "bhattis" (small traditional restaurants) that serve authentic Newari dishes. Participating in a Newari cooking class can also provide a deeper understanding of the ingredients and preparation methods.</p>
     <img src="/images/newari_cooking_class.jpg" alt="Learning to cook Newari dishes" style="max-width: 100%; height: auto; margin-bottom: 15px;" />

     <h2>The Cultural Significance</h2>
     <p>Newari food is deeply intertwined with the culture and traditions of the Newari community. Many dishes have ritualistic significance and are prepared during festivals and special occasions. Sharing a Newari meal is often a communal experience, reflecting the strong social bonds within the community, much like the social structures within Trunyan.</p>

     <p>Embark on this culinary adventure to savor the unique flavors and experience the rich cultural heritage of the Newari people, a vital part of Nepal's diverse tapestry.</p>
      `,
     },
     {
      slug: 'hiking-everest-region',
   title: 'Breathtaking Hikes in the Everest Region',
   coverImage: '/images/everest_hike_full.jpg',
   author: 'Everest Trekking Guides',
   date: 'May 4, 2025',
   categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Hiking', slug: 'hiking' }],
   tags: ['Nepal', 'Everest', 'Himalayas', 'Trekking'],
   fullContent: `
     <p>Discover stunning trails with unparalleled views of the world's highest peaks in the Everest region of Nepal. While a more demanding adventure than the Trunyan Hill hike, trekking in the Everest region offers an unforgettable experience amidst the majestic Himalayas.</p>

     <h2>Popular Hikes:</h2>
     <ul>
       <li><strong>Everest Base Camp Trek:</strong> The classic trek to the foot of Mount Everest, offering breathtaking scenery and a profound sense of accomplishment.</li>
       <img src="/images/everest_base_camp_trek.jpg" alt="Trekkers on the Everest Base Camp trail" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Gokyo Lakes Trek:</strong> Explore the beautiful turquoise Gokyo Lakes and enjoy panoramic mountain views, including Everest, Lhotse, Makalu, and Cho Oyu.</li>
       <img src="/images/gokyo_lakes_trek.jpg" alt="Turquoise Gokyo Lakes with Himalayan peaks" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Pikey Peak Trek:</strong> Offers stunning views of Everest and other Himalayan giants without the high altitude and longer duration of the EBC trek.</li>
       <img src="/images/pikey_peak_view.jpg" alt="Panoramic view of Everest from Pikey Peak" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Short Everest View Treks:</strong> Ideal for those with limited time, these treks provide excellent views of the Everest range from viewpoints like Namche Bazaar and Tengboche Monastery.</li>
       <img src="/images/everest_view_trek.jpg" alt="View of Everest from a shorter trek viewpoint" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     </ul>

     <h2>Experiencing the Everest Region</h2>
     <p>Trekking in the Everest region is not just about the mountains; it's also an opportunity to experience the unique Sherpa culture, visit ancient monasteries, and witness the resilience of the local communities living in this challenging environment. The warmth and hospitality of the Sherpa people are a highlight of any trek in this region, offering a cultural immersion similar to encountering the traditions of Trunyan.</p>

     <h2>Things to Know Before You Go</h2>
     <ul>
       <li><strong>Difficulty:</strong> Varies from moderate to strenuous depending on the trek.</li>
       <li><strong>Duration:</strong> From a few days to several weeks.</li>
       <li><strong>Altitude Sickness:</strong> A significant concern; proper acclimatization is essential.</li>
       <li><strong>Permits:</strong> You will need a Sagarmatha National Park permit and a TIMS card.</li>
     </ul>

     <h2>What to Bring</h2>
     <ul>
       <li>High-quality trekking gear suitable for high altitudes and varying weather conditions.</li>
       <li>Warm layers, including a down jacket and thermal wear.</li>
       <li>Sturdy trekking boots.</li>
       <li>Altitude sickness medication (consult your doctor).</li>
     </ul>

     <p>Hiking in the Everest region is an adventure of a lifetime, offering unparalleled natural beauty and a chance to connect with the majestic Himalayas and the unique Sherpa culture.</p>
   `,
  },
  {
   slug: 'exploring-bardia-national-park',
   title: 'Wildlife Encounters in Bardia National Park',
   coverImage: '/images/bardia_wildlife_full.jpg',
   author: 'Bardia Wildlife Experts',
   date: 'May 7, 2025',
   categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Wildlife Safari', slug: 'wildlife-safari' }],
   tags: ['Nepal', 'Bardia', 'Wildlife', 'Safari'],
   fullContent: `
     <p>Embark on a jungle safari in Bardia National Park, home to diverse wildlife including rhinos, tigers, elephants, and numerous bird species. This experience offers a different kind of natural immersion compared to the Trunyan Hill hike, focusing on wildlife observation in Nepal's Terai region.</p>

     <h2>Wildlife Activities:</h2>
     <ul>
       <li><strong>Jeep Safari:</strong> Explore the park's trails in an open jeep for the best wildlife viewing opportunities. Experienced guides will help you spot animals and interpret the jungle's signs.</li>
       <img src="/images/bardia_jeep_safari.jpg" alt="Jeep safari in Bardia National Park" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Elephant-back Safari:</strong> A unique way to get close to rhinos and other large mammals while traversing through the tall grasslands.</li>
       <img src="/images/bardia_elephant_safari.jpg" alt="Elephant-back safari for rhino spotting in Bardia" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Jungle Walk:</strong> Guided walks through the forest provide opportunities to spot birds, smaller wildlife, and learn about the park's ecosystem up close.</li>
       <img src="/images/bardia_jungle_walk.jpg" alt="Guided jungle walk in Bardia" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Canoe Ride:</strong> Explore the rivers and look for crocodiles, gharials, and various aquatic bird species. The peaceful glide along the water offers a different perspective of the park.</li>
       <img src="/images/bardia_canoe_ride.jpg" alt="Canoe ride on a river in Bardia" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     </ul>

     <h2>Experiencing Bardia's Culture</h2>
     <p>Like the cultural aspects of the Trunyan area, Bardia also offers opportunities to interact with the local Tharu community. Visit Tharu villages, witness their traditional dances, and learn about their unique way of life, which is deeply connected to the surrounding jungle.</p>
     <img src="/images/tharu_village_bardia.jpg" alt="Tharu village in the Bardia region" style="max-width: 100%; height: auto; margin-bottom: 15px;" />

     <h2>Things to Know Before You Go</h2>
     <ul>
       <li><strong>Best Time to Visit:</strong> October to April for pleasant weather and good wildlife sightings.</li>
       <li><strong>Accommodation:</strong> Options range from comfortable lodges to basic guesthouses.</li>
       <li><strong>Safety:</strong> Always follow your guide's instructions and be aware of wildlife.</li>
       <li><strong>Malaria Prevention:</strong> Consult your doctor about necessary precautions.</li>
     </ul>

     <h2>What to Bring</h2>
     <ul>
       <li>Lightweight and breathable clothing in neutral colors.</li>
       <li>Sturdy walking shoes or boots.</li>
       <li>Insect repellent.</li>
       <li>Sunscreen, hat, and sunglasses.</li>
       <li>Binoculars for wildlife viewing.</li>
       <li>Camera with a good zoom lens.</li>
     </ul>

     <p>Discover the natural beauty and incredible wildlife of Bardia National Park, a hidden gem in Nepal's Terai region offering a unique safari experience.</p>
      `,
     },
     {
      slug: 'phewa-lake-boating-pokhara',
   title: 'Tranquil Boating on Phewa Lake in Pokhara',
   coverImage: '/images/phewa_lake_boating_full.jpg',
   author: 'Pokhara Lakeside Adventures',
   date: 'May 9, 2025',
   categories: [{ name: 'Nature', slug: 'nature' }, { name: 'Boating', slug: 'bo ting' }],
   tags: ['Nepal', 'Pokhara', 'Lake', 'Boating'],
   fullContent: `
     <p>Enjoy the serenity of Phewa Lake with a relaxing boat ride and stunning reflections of the Annapurna mountains. While not a strenuous activity like the Trunyan Hill hike, boating on Phewa Lake offers a tranquil way to connect with nature and admire the stunning scenery of Pokhara.</p>

     <h2>Things to See on Phewa Lake:</h2>
     <ul>
       <li><strong>Tal Barahi Temple:</strong> A beautiful Hindu temple located on a small island in the middle of the lake. Rent a boat to visit this iconic shrine.</li>
       <img src="/images/phewa_lake_temple.jpg" alt="Tal Barahi Temple on Phewa Lake" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Begnas Lake and Rupa Lake:</strong> Two other picturesque lakes located a short drive from Pokhara, offering a more secluded boating experience.</li>
       <img src="/images/begnas_rupa_lake.jpg" alt="Scenic view of Begnas or Rupa Lake" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>World Peace Pagoda:</strong> Hike or take a boat and then a short climb to reach this hilltop pagoda offering panoramic views of Phewa Lake, Pokhara city, and the Annapurna range.</li>
       <img src="/images/world_peace_pagoda_pokhara.jpg" alt="World Peace Pagoda overlooking Phewa Lake" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Boating and Kayaking:</strong> Rent a colorful paddleboat or a kayak and explore the lake at your own pace. Enjoy the peaceful atmosphere and the reflections of the surrounding hills and mountains on the water.</li>
       <img src="/images/phewa_lake_boats.jpg" alt="Colorful boats on Phewa Lake" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
       <li><strong>Phewa Lake Shoreline:</strong> Stroll along the lakeside promenade, enjoy the vibrant atmosphere, browse the shops, and dine at the many restaurants offering views of the lake.</li>
       <img src="/images/phewa_lakeside.jpg" alt="Lakeside promenade in Pokhara" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
     </ul>

     <h2>Experiencing Phewa Lake</h2>
     <p>Boating on Phewa Lake is a quintessential Pokhara experience. Whether you're seeking tranquility, stunning views, or a visit to a cultural site like the Tal Barahi Temple, the lake offers something for everyone. The serene ambiance and the backdrop of the majestic Annapurna range create a truly unforgettable experience.</p>

     <h2>Things to Know Before You Go</h2>
     <ul>
       <li><strong>Boat Rentals:</strong> Easily available along the lakeside. Negotiate the price before renting.</li>
       <li><strong>Safety:</strong> Wear a life jacket, especially if you are not a strong swimmer.</li>
       <li><strong>Best Time for Boating:</strong> Early morning or late afternoon for calm waters and beautiful light.</li>
     </ul>

     <h2>What to Bring</h2>
     <ul>
       <li>Comfortable clothing.</li>
       <li>Sunscreen, hat, and sunglasses.</li>
       <li>Camera to capture the scenic views.</li>
       <li>Water to stay hydrated.</li>
     </ul>

     <p>A boat ride on Phewa Lake offers a relaxing and scenic escape, a perfect complement to the more adventurous activities Nepal has to offer.</p>
      `,
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
    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.fullContent }} />
    {post.tags && post.tags.length > 0 && (
     <div className="post-tags">
      <strong>Tags:</strong>
      {post.tags.map((tag) => (
       <span key={tag} className="tag">
        {tag}
       </span>
      ))}
     </div>
    )}
    <div className="breadcrumb">
     <Link to="/">Home</Link> &gt;
     <Link to="/blog">Blog</Link> &gt;
     {post.categories && post.categories.length > 0 && (
      <>
       <Link to={`/category/${post.categories[0].slug}`}>{post.categories[0].name}</Link> &gt;
      </>
     )}
     <span>{post.title}</span>
    </div>
   </div>
  );
 }

 export default BlogPostPage;