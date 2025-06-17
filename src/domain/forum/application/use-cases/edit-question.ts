import { type Either, left, right } from "@/core/either";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/questions-repository";
import { NotAllowedException } from "./exceptions/not-allowed-error";
import { ResourceNotFoundException } from "./exceptions/resource-not-found-exception";

interface EditQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
}

type EditQuestionUseCaseResponse = Either<
	ResourceNotFoundException | NotAllowedException,
	{
		question: Question;
	}
>;

export class EditQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		questionId,
		title,
		content,
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundException());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedException());
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.save(question);

		return right({
			question,
		});
	}
}
