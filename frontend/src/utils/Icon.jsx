/**
 * Icon — Reusable component that renders a Phosphor icon by marker name.
 * Usage: <Icon name="muscle" size={20} color="#F06922" />
 */
import React from 'react';
import {
    House, ArrowLeft, Rocket, Sparkle, CheckCircle, XCircle, Check, Checks,
    Warning, ArrowsClockwise, Link, ClipboardText, Barbell, PersonSimpleRun,
    SwimmingPool, Bicycle, PersonSimpleThrow, Lightning, Fire, Snowflake,
    HandHeart, Medal, SoccerBall, Target, ChartBar, TrendUp, TrendDown,
    CookingPot, ForkKnife, Egg, Leaf, Plant, Coffee, Drop, DropHalf,
    Moon, SunHorizon, Timer, Bed, CloudMoon, Circle, CircleHalf, Palette,
    FirstAid, Pill, Syringe, Sun, Jar, Asterisk, HandPalm, Hand,
    DeviceMobileCamera, ChatCircle, Phone, Envelope, Robot, HandWaving,
    ThumbsUp, ThumbsDown, User, Users, UsersThree, UsersFour,
    CreditCard, CurrencyCircleDollar, Lock, LockKey, ShieldCheck, Key, LockOpen,
    Confetti, Gift, MusicNotes, MusicNote, Trophy, MedalMilitary, Diamond,
    Crown, Star, Cake, Smiley, SmileyWink, SmileyMeh, SmileyAngry,
    SmileyXEyes, SmileyNervous, SmileySad, CalendarBlank, Notepad, PushPin,
    Megaphone, ListChecks, Bell, SpeakerHigh, SpeakerSimpleHigh, Microphone,
    Cursor as CursorIcon, GameController, Monitor, Lightbulb, Package, Plug, Desktop,
    Heart, GearSix, PencilSimple, Wrench, Footprints, FilmSlate, Flag,
    Camera, Buildings, WifiHigh, WifiSlash, Brain, FloppyDisk, Repeat,
    Question, Cat, Dog, Eye, Upload, Image, Trash, StopCircle, VideoCamera,
    HandFist, Shuffle, Broom, Bank, Heartbeat, Prohibit, BookOpen,
    GraduationCap, ChatCenteredDots, Stethoscope, MagnifyingGlass, Waves,
    Scales, Chalkboard, Briefcase, BowlFood, Orange, Grains,
} from '@phosphor-icons/react';

const iconComponents = {
    // Navigation & Actions
    home: House, back: ArrowLeft, launch: Rocket, sparkle: Sparkle,
    check_circle: CheckCircle, cross: XCircle, check: Check, double_check: Checks,
    double_checkmark: Checks, simple_check: Check, cross_mark: XCircle,
    warning: Warning, refresh: ArrowsClockwise, link: Link, clipboard: ClipboardText,

    // Health & Fitness
    muscle: Barbell, weightlifting: Barbell, swimming: SwimmingPool,
    running: PersonSimpleRun, cycling: Bicycle, yoga: PersonSimpleThrow,
    yoga_woman: PersonSimpleThrow, boxing: HandFist, martial_arts: HandFist,
    lightning: Lightning, fire: Fire, snowflake: Snowflake,
    massage: HandHeart, medal_sports: Medal, football: SoccerBall,
    target: Target, bar_chart: ChartBar, chart_up: TrendUp,
    chart_down: TrendDown, person_lifting: Barbell,

    // Food & Meals
    breakfast_egg: CookingPot, lunch_bowl: BowlFood, dinner_plate: ForkKnife,
    banana: Orange, fruit: Orange, salad: Leaf, chicken: ForkKnife,
    egg: Egg, plant: Plant, milk: Coffee, nuts: Grains, drink: Coffee,
    plate_cutlery: ForkKnife, pizza: ForkKnife, burger: ForkKnife,
    steak: ForkKnife, apple: Orange, avocado: Leaf, juice: Coffee,
    chocolate: Coffee, coffee: Coffee, chef: CookingPot,
    cook_together: CookingPot, hot_pot: BowlFood,

    // Water
    water_drop: Drop, water_tap: DropHalf,

    // Sleep & Time
    sleeping: CloudMoon, sunrise: SunHorizon, moon: Moon,
    timer: Timer, bed: Bed, zzz: CloudMoon,

    // Skin & Acne
    red_circle: Circle, black_circle: Circle, white_circle: CircleHalf,
    brown_circle: Circle, desert: Sun, mixed_type: Palette, palette: Palette,
    lotion: Jar, soap: Drop, pill: Pill, syringe: Syringe, injection: Syringe,
    sun: Sun, honey: Jar, eight_star: Asterisk, lips: Drop,
    hand_stop: HandPalm, raised_hand: Hand, bubbles: Drop,
    nail_polish: Sparkle, stethoscope: Stethoscope,
    microscope: MagnifyingGlass,

    // Communication
    phone: DeviceMobileCamera, chat_bubble: ChatCircle, phone_call: Phone,
    email: Envelope, robot: Robot, wave: HandWaving, thumbs_up: ThumbsUp,
    thumbs_down: ThumbsDown, user: User, users_group: Users,
    couple: Users, speaking_head: Microphone,
    couple_heart: Users, two_hearts: Heart,

    // Payment & Security
    credit_card: CreditCard, money_bag: CurrencyCircleDollar,
    lock: Lock, locked_key: LockKey, shield: ShieldCheck,
    key: Key, unlock: LockOpen,

    // Celebrations
    party: Confetti, gift: Gift, confetti: Confetti, birthday_cake: Cake,
    music_notes: MusicNotes, music_note: MusicNote,
    trophy: Trophy, trophy_cup: Trophy,
    gold_medal: MedalMilitary, silver_medal: MedalMilitary,
    bronze_medal: MedalMilitary, sports_medal: Medal, diamond: Diamond,
    clapping: HandWaving, robot_celebration: Robot,

    // Emotions
    smile: Smiley, grin: SmileyWink, relieved: SmileyMeh,
    angry: SmileyAngry, frustrated: SmileyAngry, devil: SmileyXEyes,
    sad: SmileySad, thinking: SmileyNervous, kiss: Heart,
    slight_smile: Smiley, raised_hands: HandWaving,
    smiling_face: Smiley,

    // Plans & Features
    crown: Crown, crystal_ball: Eye, calendar: CalendarBlank,
    tear_calendar: CalendarBlank, notepad: Notepad, page: Notepad,
    pin: PushPin, megaphone: Megaphone, book: BookOpen, books: BookOpen,
    document: ClipboardText, card_dividers: ClipboardText,

    // IoT Bot
    bell: Bell, speaker: SpeakerHigh, loud_speaker: SpeakerSimpleHigh,
    pager: Desktop, microphone: Microphone, touch: CursorIcon,
    game_controller: GameController, laptop: Monitor,
    lightbulb: Lightbulb, star: Star, package: Package, plug: Plug,
    screen: Desktop, green_heart: Heart, green_circle: Circle,
    wrench: Wrench, gear: GearSix, pencil: PencilSimple,
    theater_masks: Smiley,

    // Celebrities
    goat_messi: Trophy, star_glow: Star, microphone_celeb: Microphone,
    musical_score: MusicNotes, prince: Crown, clapperboard: FilmSlate,
    cricket_bat: Medal,

    // Friends
    walking: Footprints, ok_hand: Check,
    group_2_friends: UsersThree, group_3_friends: UsersFour,
    group_4_friends: UsersFour,

    // Misc
    india_flag: Flag, camera: Camera, camera_old: Camera,
    satellite: WifiHigh, signal: WifiSlash, building: Buildings,
    bank: Bank, hearts_revolving: Heart, brain: Brain,
    floppy_disk: FloppyDisk, repeat: Repeat, question: Question,
    formula_car: Lightning, cat: Cat, dog: Dog,
    panda: Smiley, bunny: Smiley, bear: Smiley,
    purple_heart: Heart, upload: Upload, framed_picture: Image,
    trash: Trash, stop_sign: StopCircle, video_camera: VideoCamera,
    video_recorder: VideoCamera, facepalm: Warning,
    gift_heart: Gift, ribbon: Heart, castle: Crown,
    wave_water: Waves, eyes: Eye, graduation_cap: GraduationCap,
    postbox: ChatCenteredDots, exclamation: Warning,
    shuffle: Shuffle, broom: Broom, red_heart: Heart,
    prohibited: Prohibit, dizzy_star: Sparkle,
    family_parents_daughter: UsersFour, family: UsersFour,
    scarf: HandPalm, briefcase: Briefcase, hospital: FirstAid,
    bandaid: FirstAid, chess: GameController,
    no_phone: DeviceMobileCamera, balance_scale: Scales,
    teacher: Chalkboard, shopping_cart: CreditCard,
    classical_building: Buildings, heartbeat: Heartbeat,
    keycap_number: ListChecks,
};

const defaultWeights = {
    home: 'fill', back: 'bold', launch: 'fill', sparkle: 'fill',
    check_circle: 'fill', cross: 'fill', check: 'bold', double_check: 'bold',
    warning: 'fill', refresh: 'bold', link: 'bold', clipboard: 'duotone',
    muscle: 'fill', weightlifting: 'fill', swimming: 'fill', running: 'fill',
    cycling: 'fill', yoga: 'fill', boxing: 'fill', lightning: 'fill',
    fire: 'fill', snowflake: 'regular', massage: 'fill', medal_sports: 'fill',
    football: 'fill', target: 'fill', bar_chart: 'fill', chart_up: 'bold',
    chart_down: 'bold', person_lifting: 'fill',
    breakfast_egg: 'fill', lunch_bowl: 'fill', dinner_plate: 'fill',
    banana: 'fill', fruit: 'fill', salad: 'fill', chicken: 'fill',
    egg: 'fill', plant: 'fill', milk: 'fill', nuts: 'fill', drink: 'fill',
    plate_cutlery: 'duotone', water_drop: 'fill', water_tap: 'fill',
    sleeping: 'fill', sunrise: 'fill', moon: 'fill', timer: 'fill', bed: 'fill',
    red_circle: 'fill', black_circle: 'fill', white_circle: 'regular',
    brown_circle: 'fill', mixed_type: 'fill', palette: 'fill',
    lotion: 'fill', soap: 'fill', pill: 'fill', syringe: 'fill', sun: 'fill',
    honey: 'fill', eight_star: 'bold', lips: 'fill', hand_stop: 'fill',
    raised_hand: 'fill', phone: 'fill', chat_bubble: 'fill', phone_call: 'fill',
    email: 'fill', robot: 'fill', wave: 'fill', thumbs_up: 'fill',
    thumbs_down: 'fill', user: 'fill', users_group: 'fill', couple: 'fill',
    credit_card: 'fill', money_bag: 'fill', lock: 'fill', locked_key: 'fill',
    shield: 'fill', key: 'fill', unlock: 'fill',
    party: 'fill', gift: 'fill', confetti: 'fill', birthday_cake: 'fill',
    music_notes: 'fill', music_note: 'fill', trophy: 'fill',
    gold_medal: 'fill', silver_medal: 'regular', bronze_medal: 'duotone',
    diamond: 'fill', crown: 'fill', star: 'fill', cake: 'fill',
    smile: 'fill', grin: 'fill', relieved: 'fill', angry: 'fill',
    sad: 'fill', thinking: 'fill', robot_celebration: 'fill',
    crystal_ball: 'fill', calendar: 'fill', notepad: 'fill',
    pin: 'fill', megaphone: 'fill', bell: 'fill', speaker: 'fill',
    lightbulb: 'fill', game_controller: 'fill', heart: 'fill',
    gear: 'fill', camera: 'fill', brain: 'fill', eye: 'fill',
    trophy_cup: 'fill', flag: 'fill', lock_key: 'fill',
};

export default function Icon({ name, size = 20, color, className, style }) {
    // Custom SVG icons not available in Phosphor
    if (name === 'cricket_bat') {
        const c = color || '#F06922';
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill={c} className={className} style={{ display: 'inline-flex', verticalAlign: 'middle', ...style }}>
                {/* Cricket bat handle */}
                <rect x="3" y="1" width="3.5" height="9" rx="1.5" transform="rotate(-5 4.75 5.5)" fill={c} opacity="0.85"/>
                {/* Bat blade */}
                <rect x="2.5" y="9" width="5" height="11" rx="2" transform="rotate(-5 5 14.5)" fill={c}/>
                {/* Cricket ball */}
                <circle cx="18" cy="6" r="3.5" fill={c} opacity="0.7"/>
                <path d="M15.5 4.5C16.5 5.5 17 7 18.5 7.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
                <path d="M16.5 3.5C17.5 5 18.5 6 20 6.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
            </svg>
        );
    }

    const Component = iconComponents[name];
    if (!Component) return null;
    const weight = defaultWeights[name] || 'fill';
    return <Component size={size} weight={weight} color={color} className={className} style={{ display: 'inline-flex', verticalAlign: 'middle', ...style }} />;
}
