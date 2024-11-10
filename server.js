import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define the port (from environment variable or default to 3000)
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies from POST requests
app.use(express.json());

// Serve static files (CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Medical advice and medicine recommendations
const medicalResponses = {
    "headache": {
        "description": "Headaches can be caused by various factors such as tension, dehydration, or even sinus issues. For most people, Paracetamol or Ibuprofen is recommended. Consult a doctor for specific dosages and advice."
    },
    "fever": {
        "description": "Fever is often a sign of an underlying infection or illness. Paracetamol or Ibuprofen can help manage fever. If the fever persists, it's important to consult a healthcare professional."
    },
    "cough": {
        "description": "Coughs can be caused by colds, flu, or allergies. A suitable over-the-counter cough syrup can help, but if the cough lasts for a long time, consulting a doctor is advised."
    },
    "stomach pain": {
        "description": "Stomach pain can be caused by indigestion, gas, or other gastrointestinal issues. Antacids like Tums or Pepto-Bismol can help with relief, but if the pain persists, consult a doctor."
    },
    "cold": {
        "description": "Cold symptoms typically include a runny nose, sore throat, and congestion. Rest, fluids, and decongestants can help with relief. If symptoms worsen, see a doctor."
    },
    "back pain": {
        "description": "Back pain can be caused by poor posture or overexertion. Pain relievers like acetaminophen or ibuprofen may help. For chronic pain, it's best to consult a doctor."
    },
    "diarrhea": {
        "description": "Diarrhea can lead to dehydration if not properly managed. Oral rehydration salts and staying hydrated are key. Anti-diarrheal medications like loperamide can also help. Consult a doctor if diarrhea persists."
    },
    "nausea": {
        "description": "Nausea can be caused by various factors, including motion sickness or gastrointestinal issues. Ginger or anti-nausea medications like ondansetron can help. If nausea continues, consult a doctor."
    },
    "allergies": {
        "description": "Allergic reactions may include sneezing, itchy eyes, or skin rashes. Antihistamines and nasal sprays can provide relief, but consult a doctor for the best treatment options."
    },
    // Greetings
    "hello": {
        "description": "Hello! How can I help you today? I can give general advice based on your ailments. Please mention your condition in a single word."
    },
    "hi": {
        "description": "Hi! How can I assist you today? I can give general advice based on your ailments. Please mention your condition in a single word."
    },
    "hey": {
        "description": "Hey! How can I assist you today? I can give general advice based on your ailments. Please mention your condition in a single word."
    },
    "good morning": {
        "description": "Good morning! How can I help you today? I can give general advice based on your ailments. Please mention your condition in a single word."
    },
    "good evening": {
        "description": "Good evening! How can I assist you today? I can give general advice based on your ailments. Please mention your condition in a single word."
    },
    "bye": {
        "description": "if your not feeling well even after the medication given by me you can revist our site and consult a doctor.Thank You 🙂,Goodbye! Take care and feel better soon!"
    },
    "sore throat": {
        "description": "A sore throat can be caused by colds, infections, or allergies. Lozenges, throat sprays, and warm salt water gargles may provide relief. If pain or swelling persists, consult a doctor."
    },
    "constipation": {
        "description": "Constipation can result from low fiber intake, dehydration, or lack of physical activity. Fiber supplements, laxatives like polyethylene glycol, or stool softeners may help. Drink plenty of water and consult a doctor if constipation is chronic."
    },
    "insomnia": {
        "description": "Insomnia can be caused by stress, poor sleep habits, or underlying health issues. Melatonin supplements and calming teas may aid in sleep, but establishing a consistent sleep routine is also helpful. Consult a doctor if insomnia persists."
    },
    "heartburn": {
        "description": "Heartburn may be caused by acid reflux, certain foods, or overeating. Antacids like Tums, H2 blockers like ranitidine, or proton pump inhibitors can provide relief. Avoid trigger foods and consult a doctor if symptoms are frequent."
    },
    "acne": {
        "description": "Acne can be due to hormonal changes, skin oils, or diet. Topical treatments with benzoyl peroxide or salicylic acid can reduce acne. Avoid touching your face and consult a dermatologist for persistent cases."
    },
    "earache": {
        "description": "Earaches can be caused by infections, wax buildup, or changes in pressure. Over-the-counter pain relievers may help, but consult a doctor if the pain persists or there is fluid discharge."
    },
    "rash": {
        "description": "Rashes can be caused by allergies, skin irritants, or infections. Hydrocortisone cream or antihistamines may help relieve itching and inflammation. If the rash spreads or worsens, see a doctor."
    },
    "dizziness": {
        "description": "Dizziness may result from dehydration, low blood sugar, or inner ear issues. Rest, hydration, and avoiding sudden movements can help. If dizziness is frequent, consult a healthcare professional."
    },
    "muscle cramps": {
        "description": "Muscle cramps can result from dehydration, low electrolytes, or overexertion. Magnesium or potassium supplements and hydration may help. Stretching and gentle massage are also beneficial. Consult a doctor if cramps are frequent."
    },
    "toothache": {
        "description": "Toothaches can be caused by cavities, infections, or gum issues. Over-the-counter pain relievers and clove oil may provide temporary relief. Consult a dentist if the pain persists."
    },
    "fatigue": {
        "description": "Fatigue may result from poor sleep, diet, or stress. Multivitamins, staying hydrated, and adequate sleep can help. Persistent fatigue should be evaluated by a doctor."
    },
    "joint pain": {
        "description": "Joint pain may be caused by arthritis, overuse, or injury. Ibuprofen or acetaminophen can help with pain relief. For ongoing joint issues, consult a doctor."
    },
    "anxiety": {
        "description": "Anxiety can stem from stress, lifestyle factors, or underlying mental health conditions. Natural supplements like valerian root or chamomile may help with mild anxiety. Practicing mindfulness or breathing exercises can also be beneficial. For ongoing issues, consult a mental health professional."
    },
    "menstrual cramps": {
        "description": "Menstrual cramps can cause discomfort in the lower abdomen or back. NSAIDs like ibuprofen can help relieve pain. Heat packs applied to the lower abdomen may also ease symptoms. If cramps are severe, consider consulting a gynecologist."
    },
    "migraine": {
        "description": "Migraines can cause intense headaches, nausea, and sensitivity to light. Over-the-counter medications like ibuprofen or acetaminophen can help. Avoiding known triggers and practicing relaxation techniques may also reduce symptoms. For frequent migraines, consult a neurologist."
    },
    "sciatica": {
        "description": "Sciatica pain can radiate from the lower back to the legs. NSAIDs or muscle relaxants may provide relief. Stretching, gentle exercises, and applying heat or ice can help. If pain persists, see a doctor for evaluation."
    },
    "dry eyes": {
        "description": "Dry eyes can be caused by prolonged screen time, dry environments, or allergies. Over-the-counter artificial tears or lubricating eye drops can provide relief. Reducing screen time and taking breaks may also help. Consult an eye doctor if symptoms are severe."
    },
    "eczema": {
        "description": "Eczema causes dry, itchy, and inflamed skin. Moisturizing creams, hydrocortisone creams, and antihistamines can reduce itching and inflammation. Avoid triggers like harsh soaps. If eczema persists, consult a dermatologist."
    },
    "sinus congestion": {
        "description": "Sinus congestion can result from colds, allergies, or sinusitis. Decongestants, saline nasal sprays, and steam inhalation may help relieve symptoms. Consult a doctor if symptoms last more than a week."
    },
    "motion sickness": {
        "description": "Motion sickness can cause nausea, dizziness, and sweating during travel. Medications like dimenhydrinate or ginger supplements may alleviate symptoms. Avoid reading and focus on a fixed point during travel. For severe cases, consult a doctor."
    },
    "urinary tract infection (UTI)": {
        "description": "UTIs can cause a burning sensation during urination and frequent urges to urinate. Over-the-counter pain relievers may help, but seeing a doctor is essential for antibiotics and to avoid complications."
    },
    "asthma": {
        "description": "Asthma can cause wheezing, coughing, and difficulty breathing. Fast-acting inhalers help manage acute symptoms. If you have frequent asthma attacks, consult a doctor for a long-term management plan."
    },
    "bronchitis": {
        "description": "Bronchitis often follows a respiratory infection and causes coughing and mucus production. Rest, staying hydrated, and using cough suppressants can help. If symptoms persist, consult a doctor."
    },
    "high blood pressure": {
        "description": "High blood pressure can be influenced by diet, stress, and lifestyle. Regular exercise, reducing salt intake, and managing stress can help maintain healthy levels. For high readings, consult a doctor for potential medications."
    },
    "skin infection": {
        "description": "Skin infections can appear as redness, swelling, or pus. Keep the area clean, and over-the-counter antibacterial ointments may help. If infection spreads, consult a doctor as antibiotics may be needed."
    },
    "yeast infection": {
        "description": "Yeast infections can cause itching, irritation, and discharge. Over-the-counter antifungal creams or suppositories may help. Avoid irritants like scented products. If symptoms persist, consult a doctor."
    },
    "flu": {
        "description": "The flu causes symptoms like fever, body aches, and fatigue. Rest, hydration, and over-the-counter fever reducers like acetaminophen can help manage symptoms. Consult a doctor if symptoms worsen."
    }

};

// Function to get a response based on user input
function getMedicalResponse(userInput) {
    const lowerCaseInput = userInput.toLowerCase();

    // Check if the input matches a key in the medical responses
    for (const condition in medicalResponses) {
        if (lowerCaseInput.includes(condition)) {
            const response = medicalResponses[condition];
            return `${response.description}`;
        }
    }

    return "I'm not able to answer that. Please consult a healthcare professional for medical advice.";
}

// POST endpoint to handle chat requests
app.post('/getBotResponse', (req, res) => {
    const userInput = req.body.userInput;
    const botResponse = getMedicalResponse(userInput);

    // Send the bot's response back to the client
    res.json({ response: botResponse });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
