<script lang="ts">
    import Button from '../../components/Button.svelte';
    
    let formData = {
        name: '',
        email: '',
        phone: '',
        eventType: '',
        date: '',
        message: ''
    };

    let isSubmitting = false;
    let showSuccess = false;
    let errorMessage = '';

    async function handleSubmit() {
        isSubmitting = true;
        errorMessage = '';

        try {
            const response = await fetch('https://formspree.io/f/xbloyloq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showSuccess = true;
                // Reset form
                formData = {
                    name: '',
                    email: '',
                    phone: '',
                    eventType: '',
                    date: '',
                    message: ''
                };
            } else {
                errorMessage = 'There was an error submitting the form. Please try again.';
            }
        } catch (error) {
            errorMessage = 'There was an error submitting the form. Please try again.';
        } finally {
            isSubmitting = false;
        }
    }
</script>

<section class="booking-section">
    <div class="artistic-bg"></div>
    <div class="container">
        <div class="header-content">
            <h1>Book GECKHOBOY</h1>
            <p class="subtitle">Let's create something extraordinary together</p>
        </div>

        {#if showSuccess}
            <div class="success-message">
                <h2>Thank You!</h2>
                <p>Your booking request has been submitted successfully. We'll get back to you shortly.</p>
                <button class="new-booking-btn" on:click={() => showSuccess = false}>
                    Make Another Booking
                </button>
            </div>
        {:else}
            <div class="form-container">
                <form on:submit|preventDefault={handleSubmit} class="booking-form">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                bind:value={formData.name} 
                                required 
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                bind:value={formData.email} 
                                required 
                                placeholder="Enter your email"
                            />
                        </div>

                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                bind:value={formData.phone} 
                                required 
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div class="form-group">
                            <label for="eventType">Event Type</label>
                            <select id="eventType" bind:value={formData.eventType} required>
                                <option value="">Select event type</option>
                                <option value="concert">Concert</option>
                                <option value="festival">Festival</option>
                                <option value="private">Private Event</option>
                                <option value="corporate">Corporate Event</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="date">Preferred Date</label>
                            <input 
                                type="date" 
                                id="date" 
                                bind:value={formData.date} 
                                required 
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div class="form-group full-width">
                            <label for="message">Additional Details</label>
                            <textarea 
                                id="message" 
                                bind:value={formData.message} 
                                rows="4" 
                                placeholder="Tell us more about your event..."
                            ></textarea>
                        </div>
                    </div>

                    {#if errorMessage}
                        <div class="error-message">
                            {errorMessage}
                        </div>
                    {/if}

                    <div class="submit-container">
                        <Button text="Submit Booking Request" type="submit" variant="primary" size="lg" disabled={isSubmitting} />
                    </div>
                </form>
            </div>
        {/if}
    </div>
</section>

<style>
.booking-section {
    padding: 6rem 1rem;
    background-color: #000;
    color: #fff;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
}

.artistic-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 20%, rgba(160, 185, 33, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(160, 185, 33, 0.1) 0%, transparent 50%);
    z-index: 1;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.header-content {
    text-align: center;
    margin-bottom: 4rem;
    position: relative;
}

.header-content::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: #a0b921;
    border-radius: 2px;
}

h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: #a0b921;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-family: 'Impact', sans-serif;
}

.subtitle {
    font-size: 1.25rem;
    color: #888;
    font-style: italic;
}

.form-container {
    background: rgba(17, 17, 17, 0.8);
    border-radius: 1rem;
    padding: 3rem;
    box-shadow: 0 0 30px rgba(160, 185, 33, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(160, 185, 33, 0.1);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.full-width {
    grid-column: 1 / -1;
}

label {
    font-weight: 500;
    color: #a0b921;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

input, select, textarea {
    padding: 1rem;
    border: 2px solid #333;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #a0b921;
    box-shadow: 0 0 0 3px rgba(160, 185, 33, 0.2);
}

textarea {
    resize: vertical;
    min-height: 120px;
}

.submit-container {
    margin-top: 3rem;
    text-align: center;
}

.error-message {
    background-color: rgba(255, 0, 0, 0.1);
    color: #ff4444;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
}

.success-message {
    background: rgba(17, 17, 17, 0.8);
    padding: 3rem 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(160, 185, 33, 0.1);
    text-align: center;
}

.success-message h2 {
    color: #a0b921;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.success-message p {
    color: #888;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.new-booking-btn {
    padding: 0.75rem 1.5rem;
    background-color: #a0b921;
    color: #000;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.new-booking-btn:hover {
    background-color: #8aa31d;
}

@media (max-width: 768px) {
    .booking-section {
        padding: 4rem 1rem;
    }

    h1 {
        font-size: 2.5rem;
    }

    .form-container {
        padding: 2rem;
    }

    .form-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
    .booking-section {
        padding: 3rem 1rem;
    }

    h1 {
        font-size: 2rem;
    }

    .form-container {
        padding: 1.5rem;
    }
}
</style> 