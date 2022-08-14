import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Observable, Subject } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class IdbService {
	private _dataChange: Subject<any> = new Subject<any>();
	private _dbPromise: any;

	constructor() {
	}

	connectToIDB() {
		this._dbPromise = openDB('Theme', 1, {
			upgrade: (upgrade) => {
				if (!upgrade.objectStoreNames.contains('Theme')) {
					upgrade.createObjectStore('Material You', { keyPath: "property" });
				}
			}
		});
	}

	writeToTheme(target: string, value: { [string: string]: string }) {
		this._dbPromise.then((db: any) => {
			const tx = db.transaction(target, 'readwrite');
			Object.keys(value).map(
				(key: string) => {
					tx.objectStore(target).put({
						"property": key,
						value: value[key]
					})
				}
			);
			this.getAllData('Material You').then((items: any) => {
				this._dataChange.next(items);
			});
			return tx.complete;
		});
	}

	deleteFromTheme(target: string, value: any) {
		this._dbPromise.then((db: any) => {
			const tx = db.transaction(target, 'readwrite');
			const store = tx.objectStore(target);
			store.delete(value);
			this.getAllData(target).then((items: any) => {
				this._dataChange.next(items);
			});
			return tx.complete;
		});
	}

	getAllData(target: string) {
		return this._dbPromise.then((db: any) => {
			const tx = db.transaction(target, 'readonly');
			const store = tx.objectStore(target);
			return store.getAll();
		});
	}

	async getData(target: string, key: string) {
		return await this._dbPromise.then(async (db: any) => {
			const tx = db.transaction(target, 'readonly');
			const store = tx.objectStore(target);
			const data = await store.get(key);
			return (data ? data["value"] : null) ?? null;
		});
	}

	dataChanged(): Observable<any> {
		return this._dataChange;
	}
}
