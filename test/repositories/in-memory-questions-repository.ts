import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import type { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
	items: Question[] = [];

	async save(question: Question) {
		const questionIndex = this.items.findIndex(
			(item) => item.id === question.id,
		);

		this.items[questionIndex] = question;
	}

	async create(question: Question) {
		this.items.push(question);
	}

	async findBySlug(slug: string) {
		const question = this.items.find((item) => item.slug.value === slug);

		if (!question) {
			return null;
		}

		return question;
	}

	async findById(id: string) {
		const question = this.items.find((item) => item.id.toString() === id);

		if (!question) {
			return null;
		}

		return question;
	}

	async delete(question: Question) {
		const questionIndex = this.items.findIndex(
			(item) => item.id === question.id,
		);

		this.items.splice(questionIndex, 1);
	}
}
