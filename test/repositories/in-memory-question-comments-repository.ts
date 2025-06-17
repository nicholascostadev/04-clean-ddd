import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
	implements QuestionCommentsRepository
{
	items: QuestionComment[] = [];

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}
}
