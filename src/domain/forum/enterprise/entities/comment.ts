import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface CommentProps {
	authorId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}

export abstract class Comment<
	TProps extends CommentProps,
> extends Entity<TProps> {
	get content() {
		return this.props.content;
	}

	set content(content: string) {
		this.props.content = content;

		this.touch();
	}

	get authorId() {
		return this.props.authorId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
