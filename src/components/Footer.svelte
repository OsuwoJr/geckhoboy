<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from '$app/environment';

	const currentYear = new Date().getFullYear();

	let email = "";
	let subscribeStatus = "";
	let isSubscribing = false;
	const contactEmail = "info@osvestudios.com";

	const tabs = [
		{ name: "Home", link: "/", icon: "fa-home" },
		{ name: "About", link: "/about", icon: "fa-info-circle" },
		{ name: "Services", link: "/services", icon: "fa-concierge-bell" },
		{ name: "Projects", link: "/projects", icon: "fa-project-diagram" },
		{ name: "Contact", link: "/contact", icon: "fa-envelope" }
	];

	const legal = [
		{ name: "Terms", link: "/terms", icon: "fa-file-contract" },
		{ name: "Privacy", link: "/privacy", icon: "fa-shield-alt" },
		{ name: "Booking", link: "/contact", icon: "fa-calendar-alt" }
	];

	const socialLinks = [
		{ name: 'YouTube', icon: 'fab fa-youtube', href: 'https://youtube.com/@geckhoboy', color: '#FF0000' },
		{ name: 'Spotify', icon: 'fab fa-spotify', href: 'https://open.spotify.com/artist/659wAEZkJXFdNQ1vHK9ZJa?si=kVwc73oXTfmTB-hz0UWgYA', color: '#1ED760' },
		{ name: 'Apple Music', icon: 'fab fa-apple', href: 'https://music.apple.com/us/artist/geckhoboy/1810874244', color: '#FB2D3F' },
		{ name: 'Boomplay', icon: 'fas fa-music', href: 'https://www.boomplay.com/search/default/geckhoboy', color: '#00A8E1' }
	];

	const followLinks = [
		{ name: 'Instagram', icon: 'fab fa-instagram', href: 'https://instagram.com/geckhoboy', color: '#E1306C' },
		{ name: 'TikTok', icon: 'fab fa-tiktok', href: 'https://tiktok.com/@geckhoboy', color: '#000000' }
	];

	// Contact information for development services
	const studioContacts = [
		{ name: "Email", icon: "fas fa-envelope", link: "mailto:info@osvestudios.com", color: "#00BFFF" },
		{ name: "WhatsApp", icon: "fab fa-whatsapp", link: "https://wa.me/254790932575", color: "#25D366" },
		{ name: "Phone", icon: "fas fa-phone", link: "tel:+254790932575", color: "#00BFFF" }
	];

	const handleSubscribe = (e: SubmitEvent) => {
		e.preventDefault();
		if (!email || !email.includes('@')) {
			subscribeStatus = "Please enter a valid email";
			return;
		}
		
		if (!browser) return; // Skip on server
		
		isSubscribing = true;
		
		// Direct form submission approach for Formspree
		const formData = new FormData();
		formData.append("email", email);
		formData.append("message", "Newsletter subscription request");
		
		fetch("https://formspree.io/f/xyzweeav", {
			method: "POST",
			body: formData,
			headers: {
				"Accept": "application/json"
			}
		})
		.then(response => {
			if (response.ok) {
				subscribeStatus = "Thank you for subscribing!";
				email = "";
				
				// Clear success message after 3 seconds
				setTimeout(() => {
					subscribeStatus = "";
				}, 3000);
			} else {
				throw new Error("Subscription failed");
			}
		})
		.catch((error) => {
			console.error("Form submission error:", error);
			subscribeStatus = "Something went wrong. Please try again.";
		})
		.finally(() => {
			isSubscribing = false;
		});
	};

	// Current location detection for navigation highlight
	let currentPath = "";
	onMount(() => {
		if (!browser) return; // Skip on server
		currentPath = window.location.pathname;
	});
</script>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-grid">
			<div class="footer-brand">
				<h2>GECKHOBOY</h2>
				<p>Creating extraordinary experiences through music and art</p>
			</div>

			<div class="footer-links">
				<h3>Quick Links</h3>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="#featured-products">Merch</a></li>
					<li><a href="/booking">Book Now</a></li>
				</ul>
			</div>

			<div class="footer-social">
				<h3>Connect</h3>
				<div class="social-icons">
					{#each socialLinks as link}
						<a 
							href={link.href} 
							target="_blank" 
							rel="noopener noreferrer"
							class="social-icon"
							aria-label={link.name}
							style="--hover-color: {link.color}"
						>
							<i class={link.icon}></i>
						</a>
					{/each}
				</div>

				<h3 class="follow-title">Follow Me</h3>
				<div class="social-icons">
					{#each followLinks as link}
						<a 
							href={link.href} 
							target="_blank" 
							rel="noopener noreferrer"
							class="social-icon"
							aria-label={link.name}
							style="--hover-color: {link.color}"
						>
							<i class={link.icon}></i>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear} GECKHOBOY. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	/* Social icons hover effects */
	a:hover i.fab.fa-instagram {
		background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	
	a:hover i.fab.fa-youtube {
		color: #FF0000;
	}
	
	a:hover i.fab.fa-spotify {
		color: #1ED760;
	}
	
	/* Smooth transitions */
	.transition-all {
		transition: all 0.3s ease-in-out;
	}

	.footer {
		background-color: #000;
		color: #fff;
		padding: 4rem 1rem 2rem;
		position: relative;
		border-top: 1px solid rgba(160, 185, 33, 0.1);
	}

	.footer::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			rgba(160, 185, 33, 0.3),
			transparent
		);
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 4rem;
		margin-bottom: 3rem;
	}

	.footer-brand h2 {
		font-family: 'Impact', sans-serif;
		font-size: 2rem;
		color: #a0b921;
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.footer-brand p {
		color: #888;
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.footer-links h3,
	.footer-social h3 {
		color: #a0b921;
		font-size: 1.1rem;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.follow-title {
		margin-top: 2rem;
	}

	.footer-links ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-links li {
		margin-bottom: 0.75rem;
	}

	.footer-links a {
		color: #888;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-links a:hover {
		color: #a0b921;
	}

	.social-icons {
		display: flex;
		gap: 1rem;
	}

	.social-icon {
		color: #888;
		font-size: 1.5rem;
		transition: all 0.3s ease;
	}

	.social-icon:hover {
		color: var(--hover-color);
		transform: translateY(-2px);
	}

	.footer-bottom {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(160, 185, 33, 0.1);
	}

	.footer-bottom p {
		color: #666;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.footer {
			padding: 3rem 1rem 1.5rem;
		}

		.footer-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.footer-brand {
			text-align: center;
		}

		.footer-links,
		.footer-social {
			text-align: center;
		}

		.social-icons {
			justify-content: center;
		}
	}
</style>
