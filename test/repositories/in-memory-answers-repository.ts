import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repsitory";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
	items: Answer[] = [];

	async create(answer: Answer) {
		this.items.push(answer);
	}

	async save(answer: Answer) {
		const answerIndex = this.items.findIndex((item) => item.id === answer.id);
		this.items[answerIndex] = answer;
	}

	async findById(id: string) {
		const answer = this.items.find((item) => item.id.toString() === id);

		if (!answer) {
			return null;
		}

		return answer;
	}

	async findManyByQuestionId(questionId: string, params: PaginationParams) {
		const answers = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((params.page - 1) * 20, params.page * 20);

		return answers;
	}

	async delete(answer: Answer) {
		const answerIndex = this.items.findIndex((item) => item.id === answer.id);
		this.items.splice(answerIndex, 1);
	}
}
