import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Menu.module.scss";

function FAQ() {
	return (
		<section className={styles.Faq}>
			<Header back profileMenu />
			<h1>FAQ</h1>
			<details>
				<summary>Q: I signed up, but I'm feeling lost. What do I do?</summary>
				<p>
					No worries, my friend! Just start entering your financial data
					manually into the app, and you'll start to see those fancy charts come
					to life. And if you need help, just reach out to our team - we're
					always happy to lend a helping hand, a listening ear, or a slice of
					virtual cake.
				</p>
			</details>

			<details>
				<summary>Q: Can I export my financial data?</summary>
				<p>
					Sorry, bud. Currently, we don't offer the ability to export financial
					data. But who needs exports when you have fancy charts and a product
					owner who tells the best dad jokes in the business? Trust us, your
					financial data is safe and sound in our database. No hackers gonna get
					their grubby little hands on it. But they might know what you bought
					last Saturday... just sayin'.
				</p>
			</details>

			<details>
				<summary>Q: What if I forget my password?</summary>
				<p>
					Hahaha... good one! Actually, we haven't gotten around to implementing
					the "forgot password" feature yet. But don't worry, your financial
					data is safe and sound in our database. Just remember to write down
					your password on a sticky note and stick it to your forehead for
					safekeeping. Or better yet, just don't forget it!
				</p>
			</details>

			<details>
				<summary>Q: Are there any plans to add more features?</summary>
				<p>
					Oh, absolutely! Our product owner is always dreaming up new ideas to
					make the app even better. We can't tell you what they are yet, but
					let's just say they involve a lot of glitter, unicorns, and ice cream.
					Stay tuned for updates!
				</p>
			</details>

			<details>
				<summary>Q: Can I have multiple users on my account?</summary>
				<p>
					Sorry, but our product owner is a bit overprotective of your financial
					data. So for now, you're the only one who gets to enjoy those fancy
					charts. But don't worry, we won't judge you if you want to print them
					out and hang them on your fridge.
				</p>
			</details>

			<details>
				<summary>Q: What if I have more questions?</summary>
				<p>
					Oh, we love questions! And we're here to help, no matter how silly or
					serious they may be. So don't hesitate to reach out to our team, or
					even ask ChatGPT - the largest language model trained by OpenAI. Who
					knows, you might just get some sage (or snarky) financial advice.
				</p>
			</details>
		</section>
	);
}

export default FAQ;
