import MaterialButton from '../components/material/MaterialButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';

export default function HeroRoutineScreen() {
 const navigate = useNavigate();
 const [activeTab, setActiveTab] = useState('schedule');
 const [showContent, setShowContent] = useState(false);

 const celebrityName = localStorage.getItem('celebrityName') || 'Your Hero';
 const selectedCelebrity = localStorage.getItem('selectedCelebrity') || 'kohli';

 // All athlete data
 const athleteData = {
 ronaldo: {
 name: 'Cristiano Ronaldo',
 subtitle: 'CR7 Performance Routine',
 emoji: 'football',
 color: '#16A34A',
 strength: 'Speed & Stamina',
 schedule: [
 { time: '05:45', activity: 'Wake', desc: 'Hydration (water + electrolytes), Light stretching', icon: 'sunrise' },
 { time: '06:15', activity: 'Mobility Activation', desc: 'Foam rolling, Hip/ankle mobility, Core activation', icon: 'yoga', duration: '30 min' },
 { time: '07:00', activity: 'Breakfast', desc: 'Egg whites, Wholegrain toast, Fruit, Green tea', icon: 'breakfast_egg' },
 { time: '08:00', activity: 'Strength Training', desc: 'Squats, lunges, Plyometrics, Resistance training', icon: 'muscle', duration: '75 min' },
 { time: '09:30', activity: 'Recovery', desc: 'Ice bath / cryotherapy, Compression boots', icon: 'snowflake' },
 { time: '10:30', activity: 'Snack', desc: 'Greek yogurt, Nuts', icon: 'nuts' },
 { time: '12:30', activity: 'Lunch', desc: 'Grilled fish/chicken, Quinoa/brown rice, Vegetables', icon: 'lunch_bowl' },
 { time: '14:00', activity: 'Nap', desc: 'Power nap for recovery', icon: 'sleeping', duration: '45 min' },
 { time: '15:00', activity: 'Light Conditioning', desc: 'Swimming / cycling, Balance drills', icon: 'swimming', duration: '45 min' },
 { time: '16:30', activity: 'Protein Snack', desc: 'Protein shake + banana', icon: 'banana' },
 { time: '18:30', activity: 'Dinner', desc: 'Chicken breast, Sweet potato, Salad', icon: 'dinner_plate' },
 { time: '20:00', activity: 'Stretching', desc: 'Full body stretch routine', icon: 'yoga', duration: '20 min' },
 { time: '22:00', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: 'moon' },
 ],
 tips: [
 { title: 'Sprint Training', desc: '6 × 40m sprint, Rest 60 sec - Builds fast-twitch fibers', icon: 'running' },
 { title: 'HIIT Cardio', desc: '30 sec sprint, 90 sec walk × 8 rounds', icon: 'lightning' },
 { title: 'Plyometrics', desc: 'Box jumps, Skipping, Jump squats - Makes muscles explosive', icon: 'package' },
 { title: 'Core Training', desc: 'Plank, Leg raises, Russian twists - Daily 10 min', icon: 'target' },
 ],
 diet: ['Egg whites', 'Chicken breast', 'Fish', 'Greek yogurt', 'Quinoa', 'Sweet potato', 'Green vegetables', 'Nuts', 'Fruits'],
 },
 messi: {
 name: 'Lionel Messi',
 subtitle: 'The Magician\'s Routine',
 emoji: 'football',
 color: '#3B82F6',
 strength: 'Sharp Mind & Agility',
 schedule: [
 { time: '07:00', activity: 'Wake', desc: 'Start the day calm and focused', icon: 'sunrise' },
 { time: '07:30', activity: 'Breakfast', desc: 'Oats, Yogurt, Fruit', icon: 'breakfast_egg' },
 { time: '08:30', activity: 'Mobility & Stability', desc: 'Ankle/knee strengthening, Balance drills', icon: 'yoga', duration: '40 min' },
 { time: '09:30', activity: 'Strength Training', desc: 'Bodyweight, Core, Light weights', icon: 'muscle', duration: '60 min' },
 { time: '11:00', activity: 'Recovery', desc: 'Massage, Stretching', icon: 'massage' },
 { time: '12:30', activity: 'Lunch', desc: 'Fish/chicken, Rice, Olive oil salad', icon: 'lunch_bowl' },
 { time: '14:00', activity: 'Nap', desc: 'Mental recovery', icon: 'sleeping', duration: '30 min' },
 { time: '15:00', activity: 'Speed & Agility', desc: 'Ladder drills, Short sprints', icon: 'lightning', duration: '45 min' },
 { time: '16:30', activity: 'Snack', desc: 'Fruit + protein', icon: 'apple' },
 { time: '19:00', activity: 'Dinner', desc: 'Chicken + vegetables', icon: 'dinner_plate' },
 { time: '22:30', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: 'moon' },
 ],
 tips: [
 { title: 'Daily Meditation', desc: '10-15 min - Reduces cortisol, improves focus', icon: 'yoga' },
 { title: 'Decision Training', desc: 'Chess, Strategy games, Puzzles - Improves brain speed', icon: 'chess' },
 { title: 'Visualization', desc: '5 min/day before sleep - Brain trains itself', icon: 'target' },
 { title: 'Digital Control', desc: 'Limit reels, shorts, scrolling - Protects focus', icon: 'no_phone' },
 ],
 diet: ['Oats', 'Fish', 'Chicken', 'Rice', 'Olive oil', 'Fresh fruits', 'Vegetables', 'Yogurt'],
 },
 dhoni: {
 name: 'MS Dhoni',
 subtitle: 'Captain Cool Routine',
 emoji: 'cricket_bat',
 color: '#1E40AF',
 strength: 'Sharp Mind & Leadership',
 schedule: [
 { time: '06:30', activity: 'Wake', desc: 'Start the day focused', icon: 'sunrise' },
 { time: '07:00', activity: 'Breakfast', desc: 'Eggs / poha, Fruit, Milk', icon: 'breakfast_egg' },
 { time: '08:00', activity: 'Conditioning', desc: 'Jogging, Agility drills, Balance work', icon: 'running', duration: '60 min' },
 { time: '09:30', activity: 'Strength Training', desc: 'Core, Back, Shoulders', icon: 'muscle' },
 { time: '11:00', activity: 'Recovery', desc: 'Stretching, Massage', icon: 'massage' },
 { time: '13:00', activity: 'Lunch', desc: 'Chicken/mutton curry, Rice/roti, Salad', icon: 'lunch_bowl' },
 { time: '14:30', activity: 'Rest', desc: 'Mental recovery and relaxation', icon: 'sleeping', duration: '45 min' },
 { time: '16:00', activity: 'Functional Training', desc: 'Medicine ball, Grip training', icon: 'weightlifting' },
 { time: '17:30', activity: 'Snack', desc: 'Nuts + fruit', icon: 'nuts' },
 { time: '19:30', activity: 'Dinner', desc: 'Light chicken dish, Vegetables', icon: 'dinner_plate' },
 { time: '22:30', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: 'moon' },
 ],
 tips: [
 { title: 'Emotional Control', desc: 'Don\'t panic - brain stays logical under pressure', icon: 'brain' },
 { title: 'Pattern Recognition', desc: 'Read situations like chess - anticipate moves', icon: 'chess' },
 { title: 'Low Cortisol', desc: 'Manage stress for better decisions', icon: 'relieved' },
 { title: 'High Focus Span', desc: 'Concentrate for hours without distraction', icon: 'target' },
 ],
 diet: ['Eggs', 'Chicken', 'Mutton', 'Rice', 'Roti', 'Milk', 'Fruits', 'Nuts', 'Vegetables'],
 },
 kohli: {
 name: 'Virat Kohli',
 subtitle: 'King Kohli Routine',
 emoji: 'muscle',
 color: '#DC2626',
 strength: 'Speed & Stamina',
 schedule: [
 { time: '06:00', activity: 'Wake', desc: 'Early start for maximum productivity', icon: 'sunrise' },
 { time: '06:15', activity: 'Hydration + Mobility', desc: 'Water and light stretching', icon: 'water_drop' },
 { time: '06:45', activity: 'Breakfast', desc: 'Smoothie, Oats, Seeds', icon: 'breakfast_egg' },
 { time: '07:45', activity: 'HIIT + Cardio', desc: 'Interval runs, Sprint drills', icon: 'running', duration: '60 min' },
 { time: '09:30', activity: 'Strength Training', desc: 'Deadlifts, Pull-ups, Core', icon: 'muscle' },
 { time: '11:00', activity: 'Recovery', desc: 'Ice bath, Stretching', icon: 'snowflake' },
 { time: '13:00', activity: 'Lunch', desc: 'Grilled chicken, Brown rice, Greens', icon: 'lunch_bowl' },
 { time: '14:30', activity: 'Nap', desc: 'Recovery sleep', icon: 'sleeping', duration: '40 min' },
 { time: '16:00', activity: 'Flexibility & Yoga', desc: 'Deep stretching and balance', icon: 'yoga' },
 { time: '18:00', activity: 'Protein Snack', desc: 'Post-workout nutrition', icon: 'drink' },
 { time: '20:00', activity: 'Dinner', desc: 'Fish/chicken, Vegetables', icon: 'dinner_plate' },
 { time: '22:30', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: 'moon' },
 ],
 tips: [
 { title: 'HIIT Cardio', desc: '30 sec sprint, 90 sec walk × 8 rounds - Improves oxygen system', icon: 'lightning' },
 { title: 'Sprint Training', desc: '6 × 40m sprint - Builds explosive power', icon: 'running' },
 { title: 'Never Miss Training', desc: 'Discipline is everything - train even when you don\'t feel like it', icon: 'muscle' },
 { title: 'Clean Diet', desc: 'No junk, no alcohol - fuel your body right', icon: 'salad' },
 ],
 diet: ['Smoothies', 'Oats', 'Grilled chicken', 'Fish', 'Brown rice', 'Green vegetables', 'Seeds', 'Protein shakes'],
 },
 rohit: {
 name: 'Rohit Sharma',
 subtitle: 'Hitman Routine',
 emoji: 'target',
 color: '#0891B2',
 strength: 'Lean Muscle & Balance',
 schedule: [
 { time: '07:00', activity: 'Wake', desc: 'Start the day relaxed', icon: 'sunrise' },
 { time: '07:15', activity: 'Breakfast', desc: 'Smoothie, Oats, Banana', icon: 'breakfast_egg' },
 { time: '08:30', activity: 'Cardio', desc: 'Cycling, Jogging', icon: 'cycling', duration: '45 min' },
 { time: '09:30', activity: 'Gym Training', desc: 'Chest, Back, Core', icon: 'muscle' },
 { time: '11:00', activity: 'Recovery', desc: 'Massage, Stretching', icon: 'massage' },
 { time: '13:00', activity: 'Lunch', desc: 'Chicken/fish, Rice, Salad', icon: 'lunch_bowl' },
 { time: '15:00', activity: 'Rest', desc: 'Mental and physical recovery', icon: 'sleeping', duration: '30-40 min' },
 { time: '16:30', activity: 'Agility Training', desc: 'Quick footwork and reactions', icon: 'lightning' },
 { time: '18:00', activity: 'Snack', desc: 'Fruit + nuts', icon: 'apple' },
 { time: '20:00', activity: 'Dinner', desc: 'Lean protein + vegetables', icon: 'dinner_plate' },
 { time: '22:30', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: 'moon' },
 ],
 tips: [
 { title: 'Compound Lifts', desc: 'Push-ups, Squats, Pull-ups, Lunges - Build functional strength', icon: 'weightlifting' },
 { title: 'Protein Intake', desc: '1.6g-2g per kg bodyweight - Essential for muscle', icon: 'steak' },
 { title: 'Clean Eating', desc: 'Avoid chips, cold drinks, fried food - Eat for growth', icon: 'salad' },
 { title: 'Quality Sleep', desc: 'Growth hormone releases during sleep - 7-8 hours minimum', icon: 'sleeping' },
 ],
 diet: ['Smoothies', 'Oats', 'Chicken', 'Fish', 'Rice', 'Eggs', 'Paneer', 'Fruits', 'Nuts'],
 },
 neymar: {
 name: 'Neymar Jr',
 subtitle: 'Skill Master Routine',
 emoji: 'football',
 color: '#8B5CF6',
 strength: 'Flexibility & Skills',
 schedule: [
 { time: '06:30', activity: 'Wake', desc: 'Start fresh', icon: 'sunrise' },
 { time: '07:00', activity: 'Breakfast', desc: 'Eggs, Fruit, Juice', icon: 'breakfast_egg' },
 { time: '08:00', activity: 'Mobility & Warm-up', desc: 'Full body preparation', icon: 'yoga' },
 { time: '09:00', activity: 'Strength Training', desc: 'Legs, Core, Balance', icon: 'muscle' },
 { time: '10:30', activity: 'Recovery', desc: 'Physiotherapy, Massage', icon: 'massage' },
 { time: '12:30', activity: 'Lunch', desc: 'Rice + beans, Chicken/fish', icon: 'lunch_bowl' },
 { time: '14:00', activity: 'Rest', desc: 'Recovery time', icon: 'sleeping', duration: '40 min' },
 { time: '15:30', activity: 'Speed & Coordination', desc: 'Quick feet and reactions', icon: 'lightning' },
 { time: '17:00', activity: 'Protein Snack', desc: 'Post-training nutrition', icon: 'drink' },
 { time: '19:30', activity: 'Dinner', desc: 'Pasta/chicken, Vegetables', icon: 'dinner_plate' },
 { time: '22:30', activity: 'Sleep', desc: '7-9 hours of quality sleep', icon: 'moon' },
 ],
 tips: [
 { title: 'Flexibility Work', desc: 'Daily stretching prevents injury and improves agility', icon: 'yoga' },
 { title: 'Ball Skills', desc: 'Practice dribbling and close control daily', icon: 'football' },
 { title: 'Core Stability', desc: 'Strong core = better balance and power', icon: 'target' },
 { title: 'Recovery First', desc: 'Physiotherapy and massage are essential', icon: 'massage' },
 ],
 diet: ['Eggs', 'Rice', 'Beans', 'Chicken', 'Fish', 'Pasta', 'Fresh fruits', 'Vegetables', 'Natural juices'],
 },
 srk: {
 name: 'Shah Rukh Khan',
 subtitle: 'King Khan Transformation',
 emoji: 'crown',
 color: '#F59E0B',
 strength: 'Discipline & Transformation',
 schedule: [
 { time: '06:00', activity: 'Wake', desc: 'Early start for productivity', icon: 'sunrise' },
 { time: '06:30', activity: 'Cardio', desc: 'Running or cycling', icon: 'running', duration: '45 min' },
 { time: '07:30', activity: 'Breakfast', desc: 'Eggs, Toast, Fresh juice', icon: 'breakfast_egg' },
 { time: '09:00', activity: 'Gym Training', desc: 'Full body workout', icon: 'muscle', duration: '90 min' },
 { time: '11:00', activity: 'Recovery', desc: 'Stretching and rest', icon: 'massage' },
 { time: '12:30', activity: 'Lunch', desc: 'Grilled protein, Salad', icon: 'lunch_bowl' },
 { time: '14:00', activity: 'Work/Meetings', desc: 'Professional commitments', icon: 'briefcase' },
 { time: '17:00', activity: 'Snack', desc: 'Healthy snack', icon: 'nuts' },
 { time: '19:00', activity: 'Evening Workout', desc: 'Light training or yoga', icon: 'yoga' },
 { time: '20:30', activity: 'Dinner', desc: 'Light, protein-rich meal', icon: 'dinner_plate' },
 { time: '23:00', activity: 'Sleep', desc: '6-7 hours of sleep', icon: 'moon' },
 ],
 tips: [
 { title: 'Consistency', desc: 'Train even on busy days - no excuses', icon: 'muscle' },
 { title: 'Transformation Mindset', desc: 'Age is just a number - keep pushing', icon: 'fire' },
 { title: 'Work-Life Balance', desc: 'Balance work with fitness priorities', icon: 'balance_scale' },
 { title: 'Personal Trainer', desc: 'Work with experts for best results', icon: 'teacher' },
 ],
 diet: ['Eggs', 'Grilled chicken', 'Fish', 'Salads', 'Fresh juices', 'Nuts', 'Limited carbs'],
 },
 salman: {
 name: 'Salman Khan',
 subtitle: 'Bhai Workout',
 emoji: 'muscle',
 color: '#EF4444',
 strength: 'Muscle Building',
 schedule: [
 { time: '07:00', activity: 'Wake', desc: 'Start the day strong', icon: 'sunrise' },
 { time: '07:30', activity: 'Morning Cycling', desc: 'Cardio to start the day', icon: 'cycling', duration: '30 min' },
 { time: '08:00', activity: 'Breakfast', desc: 'High protein breakfast', icon: 'breakfast_egg' },
 { time: '09:00', activity: 'Heavy Lifting', desc: 'Chest, Shoulders, Arms', icon: 'weightlifting', duration: '90 min' },
 { time: '11:00', activity: 'Swimming', desc: 'Recovery and cardio', icon: 'swimming' },
 { time: '12:30', activity: 'Lunch', desc: 'High protein meal', icon: 'lunch_bowl' },
 { time: '14:00', activity: 'Rest', desc: 'Muscle recovery', icon: 'sleeping' },
 { time: '16:00', activity: 'Evening Gym', desc: 'Back, Legs, Core', icon: 'muscle', duration: '60 min' },
 { time: '18:00', activity: 'Snack', desc: 'Protein shake', icon: 'drink' },
 { time: '20:00', activity: 'Dinner', desc: 'Protein with vegetables', icon: 'dinner_plate' },
 { time: '23:00', activity: 'Sleep', desc: '7 hours of sleep', icon: 'moon' },
 ],
 tips: [
 { title: 'Heavy Compound Lifts', desc: 'Bench press, Squats, Deadlifts - Build mass', icon: 'weightlifting' },
 { title: 'High Protein', desc: 'Chicken, Fish, Eggs - Essential for muscle', icon: 'steak' },
 { title: 'Cycling', desc: 'Regular cycling for cardio without losing muscle', icon: 'cycling' },
 { title: 'Consistency', desc: 'Train for decades - build a legacy physique', icon: 'muscle' },
 ],
 diet: ['Eggs', 'Chicken', 'Fish', 'Protein shakes', 'Rice', 'Vegetables', 'Almonds'],
 },
 akshay: {
 name: 'Akshay Kumar',
 subtitle: 'Khiladi Routine',
 emoji: 'martial_arts',
 color: '#F97316',
 strength: 'Martial Arts & Discipline',
 schedule: [
 { time: '04:30', activity: 'Wake', desc: 'Extremely early start', icon: 'sunrise' },
 { time: '05:00', activity: 'Martial Arts', desc: 'Kickboxing, Taekwondo training', icon: 'martial_arts', duration: '60 min' },
 { time: '06:00', activity: 'Swimming', desc: 'Full body workout', icon: 'swimming' },
 { time: '07:00', activity: 'Breakfast', desc: 'Protein-rich meal', icon: 'breakfast_egg' },
 { time: '08:00', activity: 'Work/Shooting', desc: 'Professional commitments', icon: 'clapperboard' },
 { time: '12:00', activity: 'Lunch', desc: 'Simple, healthy meal', icon: 'lunch_bowl' },
 { time: '17:00', activity: 'Light Workout', desc: 'Stretching or yoga', icon: 'yoga' },
 { time: '18:30', activity: 'Dinner', desc: 'Dinner before sunset', icon: 'dinner_plate' },
 { time: '19:30', activity: 'Family Time', desc: 'No work after dinner', icon: 'family_parents_daughter' },
 { time: '21:00', activity: 'Sleep', desc: 'Early to bed, 7+ hours', icon: 'moon' },
 ],
 tips: [
 { title: 'Early Rising', desc: 'Wake at 4:30 AM - maximum productivity', icon: '⏰' },
 { title: 'Martial Arts', desc: 'Regular practice builds discipline and fitness', icon: 'martial_arts' },
 { title: 'No Late Dinners', desc: 'Eat before sunset - better digestion', icon: 'sunrise' },
 { title: 'Work-Life Balance', desc: 'No work after 7 PM - family first', icon: 'family_parents_daughter' },
 ],
 diet: ['Simple home food', 'Proteins', 'Vegetables', 'No alcohol', 'No smoking', 'Limited sugar'],
 },
 };

 const athlete = athleteData[selectedCelebrity] || athleteData.kohli;

 useEffect(() => {
 setTimeout(() => setShowContent(true), 100);
 }, []);

 const handleContinue = () => {
 navigate('/meal-freq');
 };

 const tabs = [
 { id: 'schedule', label: 'Daily Schedule', icon: 'calendar' },
 { id: 'tips', label: 'Training Tips', icon: 'lightbulb' },
 { id: 'diet', label: 'Diet Plan', icon: 'salad' },
 ];

 return (
 <Layout
 title={athlete.name}
 subtitle={athlete.subtitle}
 showBack
 >
 <div style={{ maxWidth: 700, margin: '0 auto' }}>
 {/* Hero Header */}
 <div style={{
 background: `linear-gradient(135deg, ${athlete.color}15 0%, ${athlete.color}25 100%)`,
 borderRadius: 24,
 padding: '32px',
 marginBottom: 28,
 textAlign: 'center',
 opacity: showContent ? 1 : 0,
 transform: showContent ? 'translateY(0)' : 'translateY(20px)',
 transition: 'all 0.5s ease',
 }}>
 <div style={{
 width: 100,
 height: 100,
 background: `linear-gradient(135deg, ${athlete.color}30 0%, ${athlete.color}50 100%)`,
 borderRadius: 28,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: 56,
 margin: '0 auto 20px',
 boxShadow: `0 12px 40px ${athlete.color}30`,
 }}>
 <Icon name={athlete.emoji} size={48} color={athlete.color} />
 </div>
 <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 8 }}>
 {athlete.name}
 </h2>
 <p style={{ fontSize: 15, color: '#666', marginBottom: 16 }}>{athlete.subtitle}</p>
 <div style={{
 display: 'inline-block',
 background: athlete.color,
 color: '#FFF',
 padding: '10px 24px',
 borderRadius: 12,
 fontSize: 14,
 fontWeight: 700,
 }}>Focus: {athlete.strength}
 </div>
 </div>

 {/* Tabs */}
 <div style={{
 display: 'flex',
 gap: 10,
 marginBottom: 24,
 background: '#F3F4F6',
 borderRadius: 14,
 padding: 6,
 }}>
 {tabs.map(tab => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 onMouseEnter={(e) => { if (activeTab !== tab.id) { e.currentTarget.style.background = `${athlete.color}15`; e.currentTarget.style.color = athlete.color; } }}
 onMouseLeave={(e) => { if (activeTab !== tab.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#666'; } }}
 style={{
 flex: 1,
 background: activeTab === tab.id ? '#FFFFFF' : 'transparent',
 border: 'none',
 borderRadius: 10,
 padding: '14px 20px',
 fontSize: 14,
 fontWeight: 600,
 color: activeTab === tab.id ? athlete.color : '#666',
 cursor: 'pointer',
 transition: 'all 0.3s ease',
 boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
 fontFamily: 'inherit',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 8,
 }}
 >
 <Icon name={tab.icon} size={18} color={activeTab === tab.id ? athlete.color : undefined} /> {tab.label}
 </button>
 ))}
 </div>

 {/* Tab Content */}
 <div style={{
 background: '#FAFAF8',
 borderRadius: 20,
 padding: '28px',
 marginBottom: 28,
 boxShadow: '6px 6px 16px rgba(0,0,0,0.1), -6px -6px 16px rgba(255,255,255,0.6)',
 }}>
 {/* Schedule Tab */}
 {activeTab === 'schedule' && (
	<div style={{ position: 'relative', paddingLeft: 36 }}>
	{/* Vertical timeline track */}
	<div style={{
	position: 'absolute',
	top: 20,
	left: 14,
	bottom: 20,
	width: 3,
	background: `linear-gradient(180deg, ${athlete.color}40 0%, ${athlete.color}15 100%)`,
	borderRadius: 2,
	}} />

	{athlete.schedule.map((item, i) => {
	const isWorkout = item.duration;
	return (
	<div
	key={i}
	style={{
	position: 'relative',
	marginBottom: i < athlete.schedule.length - 1 ? 8 : 0,
	opacity: showContent ? 1 : 0,
	transform: showContent ? 'translateX(0)' : 'translateX(-16px)',
	transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	transitionDelay: `${i * 0.04}s`,
	}}
	>
	{/* Timeline dot */}
	<div style={{
	position: 'absolute',
	left: -28,
	top: 22,
	width: isWorkout ? 14 : 10,
	height: isWorkout ? 14 : 10,
	borderRadius: '50%',
	background: isWorkout ? athlete.color : '#FFFFFF',
	border: `3px solid ${athlete.color}`,
	boxShadow: isWorkout ? `0 0 12px ${athlete.color}50` : `0 0 6px ${athlete.color}20`,
	zIndex: 2,
	}} />

	{/* Card */}
	<div style={{
	display: 'flex',
	alignItems: 'center',
	gap: 14,
	padding: '14px 18px',
	background: isWorkout
	? `linear-gradient(135deg, ${athlete.color}08 0%, ${athlete.color}04 100%)`
	: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
	borderRadius: 16,
	border: isWorkout ? `1px solid ${athlete.color}20` : '1px solid rgba(0,0,0,0.04)',
	cursor: 'default',
	transition: 'all 0.3s ease',
	}}>
	{/* Icon */}
	<div style={{
	width: 46,
	height: 46,
	background: `linear-gradient(135deg, ${athlete.color}18 0%, ${athlete.color}30 100%)`,
	borderRadius: 14,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
	boxShadow: `0 4px 12px ${athlete.color}12`,
	}}><Icon name={item.icon} size={20} /></div>

	{/* Content */}
	<div style={{ flex: 1, minWidth: 0 }}>
	<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
	<span style={{
	fontSize: 13,
	fontWeight: 800,
	color: athlete.color,
	fontVariantNumeric: 'tabular-nums',
	letterSpacing: '-0.3px',
	}}>{item.time}</span>
	<span style={{
	fontSize: 15,
	fontWeight: 700,
	color: '#111',
	}}>{item.activity}</span>
	{item.duration && (
	<span style={{
	fontSize: 10,
	fontWeight: 700,
	background: `${athlete.color}18`,
	color: athlete.color,
	padding: '3px 10px',
	borderRadius: 20,
	letterSpacing: '0.3px',
	textTransform: 'uppercase',
	}}>{item.duration}</span>
	)}
	</div>
	<p style={{
	fontSize: 12,
	color: '#888',
	lineHeight: 1.4,
	margin: 0,
	}}>{item.desc}</p>
	</div>
	</div>
	</div>
	);
	})}
	</div>
	)}

 {/* Tips Tab */}
 {activeTab === 'tips' && (
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
 {athlete.tips.map((tip, i) => (
 <div
 key={i}
 style={{
 padding: '24px',
 background: `${athlete.color}08`,
 borderRadius: 16,
 border: `1px solid ${athlete.color}20`,
 opacity: showContent ? 1 : 0,
 transform: showContent ? 'scale(1)' : 'scale(0.95)',
 transition: 'all 0.4s ease',
 transitionDelay: `${i * 0.1}s`,
 }}
 >
 <div style={{
 width: 50,
 height: 50,
 background: `${athlete.color}20`,
 borderRadius: 14,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: 26,
 marginBottom: 14,
 }}><Icon name={tip.icon} size={20} /></div>
 <h4 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 8 }}>{tip.title}</h4>
 <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{tip.desc}</p>
 </div>
 ))}
 </div>
 )}

 {/* Diet Tab */}
 {activeTab === 'diet' && (
 <div><p style={{ fontSize: 15, color: '#666', marginBottom: 20, lineHeight: 1.6 }}>
 <strong>{athlete.name}'s</strong> diet focuses on clean eating, high protein, and proper nutrition timing.
 </p>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
 {athlete.diet.map((food, i) => (
 <span
 key={i}
 style={{
 padding: '12px 20px',
 background: `${athlete.color}12`,
 color: athlete.color,
 borderRadius: 12,
 fontSize: 14,
 fontWeight: 600,
 border: `1px solid ${athlete.color}25`,
 opacity: showContent ? 1 : 0,
 transform: showContent ? 'scale(1)' : 'scale(0.9)',
 transition: 'all 0.3s ease',
 transitionDelay: `${i * 0.05}s`,
 }}
 >
 {food}
 </span>
 ))}
 </div>

 {/* Common Pattern */}
 <div style={{
 marginTop: 28,
 padding: '20px',
 background: `${athlete.color}10`,
 borderRadius: 14,
 border: `1px solid ${athlete.color}30`,
 }}><h4 style={{ fontSize: 15, fontWeight: 700, color: athlete.color, marginBottom: 12 }}>
 Common Pattern (All Elite Athletes)
 </h4>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
 {[
 { label: 'Sleep', value: '7-9 hrs + naps' },
 { label: 'Meals', value: '5-6 per day' },
 { label: 'Protein', value: 'Chicken, fish, eggs' },
 { label: 'Training', value: '2 sessions/day' },
 { label: 'Hydration', value: '3-5 liters/day' },
 { label: 'Recovery', value: 'Ice, massage, stretch' },
 ].map((item, i) => (
 <div key={i} style={{ textAlign: 'center' }}>
 <p style={{ fontSize: 12, color: athlete.color, fontWeight: 600 }}>{item.label}</p>
 <p style={{ fontSize: 11, color: '#666' }}>{item.value}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}
 </div>

 {/* Continue Button */}
 <MaterialButton
 onClick={handleContinue}
 style={{
 width: '100%',
 background: `linear-gradient(135deg, ${athlete.color} 0%, ${athlete.color}dd 100%)`,
 border: 'none',
 borderRadius: 16,
 padding: '22px',
 fontSize: 18,
 fontWeight: 700,
 color: '#FFFFFF',
 cursor: 'pointer',
 boxShadow: `0 12px 45px ${athlete.color}40`,
 transition: 'all 0.3s ease',
 }}
 >
 <Icon name="fire" size={18} /> Start {athlete.name} Challenge →
 </MaterialButton>
 </div>
 </Layout>
 );
}
