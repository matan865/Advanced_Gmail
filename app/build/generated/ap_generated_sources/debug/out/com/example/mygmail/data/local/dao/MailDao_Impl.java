package com.example.mygmail.data.local.dao;

import android.database.Cursor;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.lifecycle.LiveData;
import androidx.room.EntityInsertionAdapter;
import androidx.room.RoomDatabase;
import androidx.room.RoomSQLiteQuery;
import androidx.room.SharedSQLiteStatement;
import androidx.room.util.CursorUtil;
import androidx.room.util.DBUtil;
import androidx.sqlite.db.SupportSQLiteStatement;
import com.example.mygmail.data.local.converters.StringListConverter;
import com.example.mygmail.data.local.entity.MailEntity;
import java.lang.Class;
import java.lang.Exception;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import javax.annotation.processing.Generated;

@Generated("androidx.room.RoomProcessor")
@SuppressWarnings({"unchecked", "deprecation"})
public final class MailDao_Impl implements MailDao {
  private final RoomDatabase __db;

  private final EntityInsertionAdapter<MailEntity> __insertionAdapterOfMailEntity;

  private final SharedSQLiteStatement __preparedStmtOfDelete;

  public MailDao_Impl(@NonNull final RoomDatabase __db) {
    this.__db = __db;
    this.__insertionAdapterOfMailEntity = new EntityInsertionAdapter<MailEntity>(__db) {
      @Override
      @NonNull
      protected String createQuery() {
        return "INSERT OR REPLACE INTO `mails` (`id`,`subject`,`body`,`date`,`read`,`fromName`,`fromEmail`,`trashed`,`labels`) VALUES (?,?,?,?,?,?,?,?,?)";
      }

      @Override
      protected void bind(@NonNull final SupportSQLiteStatement statement,
          final MailEntity entity) {
        if (entity.id == null) {
          statement.bindNull(1);
        } else {
          statement.bindString(1, entity.id);
        }
        if (entity.subject == null) {
          statement.bindNull(2);
        } else {
          statement.bindString(2, entity.subject);
        }
        if (entity.body == null) {
          statement.bindNull(3);
        } else {
          statement.bindString(3, entity.body);
        }
        if (entity.date == null) {
          statement.bindNull(4);
        } else {
          statement.bindString(4, entity.date);
        }
        final int _tmp = entity.read ? 1 : 0;
        statement.bindLong(5, _tmp);
        if (entity.fromName == null) {
          statement.bindNull(6);
        } else {
          statement.bindString(6, entity.fromName);
        }
        if (entity.fromEmail == null) {
          statement.bindNull(7);
        } else {
          statement.bindString(7, entity.fromEmail);
        }
        final int _tmp_1 = entity.trashed ? 1 : 0;
        statement.bindLong(8, _tmp_1);
        final String _tmp_2 = StringListConverter.toDb(entity.labels);
        if (_tmp_2 == null) {
          statement.bindNull(9);
        } else {
          statement.bindString(9, _tmp_2);
        }
      }
    };
    this.__preparedStmtOfDelete = new SharedSQLiteStatement(__db) {
      @Override
      @NonNull
      public String createQuery() {
        final String _query = "DELETE FROM mails WHERE id=?";
        return _query;
      }
    };
  }

  @Override
  public void upsertAll(final List<MailEntity> list) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __insertionAdapterOfMailEntity.insert(list);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void upsert(final MailEntity e) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __insertionAdapterOfMailEntity.insert(e);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void delete(final String id) {
    __db.assertNotSuspendingTransaction();
    final SupportSQLiteStatement _stmt = __preparedStmtOfDelete.acquire();
    int _argIndex = 1;
    if (id == null) {
      _stmt.bindNull(_argIndex);
    } else {
      _stmt.bindString(_argIndex, id);
    }
    try {
      __db.beginTransaction();
      try {
        _stmt.executeUpdateDelete();
        __db.setTransactionSuccessful();
      } finally {
        __db.endTransaction();
      }
    } finally {
      __preparedStmtOfDelete.release(_stmt);
    }
  }

  @Override
  public LiveData<List<MailEntity>> observeInbox() {
    final String _sql = "SELECT * FROM mails ORDER BY date DESC";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    return __db.getInvalidationTracker().createLiveData(new String[] {"mails"}, false, new Callable<List<MailEntity>>() {
      @Override
      @Nullable
      public List<MailEntity> call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
          final int _cursorIndexOfSubject = CursorUtil.getColumnIndexOrThrow(_cursor, "subject");
          final int _cursorIndexOfBody = CursorUtil.getColumnIndexOrThrow(_cursor, "body");
          final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
          final int _cursorIndexOfRead = CursorUtil.getColumnIndexOrThrow(_cursor, "read");
          final int _cursorIndexOfFromName = CursorUtil.getColumnIndexOrThrow(_cursor, "fromName");
          final int _cursorIndexOfFromEmail = CursorUtil.getColumnIndexOrThrow(_cursor, "fromEmail");
          final int _cursorIndexOfTrashed = CursorUtil.getColumnIndexOrThrow(_cursor, "trashed");
          final int _cursorIndexOfLabels = CursorUtil.getColumnIndexOrThrow(_cursor, "labels");
          final List<MailEntity> _result = new ArrayList<MailEntity>(_cursor.getCount());
          while (_cursor.moveToNext()) {
            final MailEntity _item;
            final String _tmpId;
            if (_cursor.isNull(_cursorIndexOfId)) {
              _tmpId = null;
            } else {
              _tmpId = _cursor.getString(_cursorIndexOfId);
            }
            final String _tmpSubject;
            if (_cursor.isNull(_cursorIndexOfSubject)) {
              _tmpSubject = null;
            } else {
              _tmpSubject = _cursor.getString(_cursorIndexOfSubject);
            }
            final String _tmpBody;
            if (_cursor.isNull(_cursorIndexOfBody)) {
              _tmpBody = null;
            } else {
              _tmpBody = _cursor.getString(_cursorIndexOfBody);
            }
            final String _tmpDate;
            if (_cursor.isNull(_cursorIndexOfDate)) {
              _tmpDate = null;
            } else {
              _tmpDate = _cursor.getString(_cursorIndexOfDate);
            }
            final boolean _tmpRead;
            final int _tmp;
            _tmp = _cursor.getInt(_cursorIndexOfRead);
            _tmpRead = _tmp != 0;
            final String _tmpFromName;
            if (_cursor.isNull(_cursorIndexOfFromName)) {
              _tmpFromName = null;
            } else {
              _tmpFromName = _cursor.getString(_cursorIndexOfFromName);
            }
            final String _tmpFromEmail;
            if (_cursor.isNull(_cursorIndexOfFromEmail)) {
              _tmpFromEmail = null;
            } else {
              _tmpFromEmail = _cursor.getString(_cursorIndexOfFromEmail);
            }
            final List<String> _tmpLabels;
            final String _tmp_1;
            if (_cursor.isNull(_cursorIndexOfLabels)) {
              _tmp_1 = null;
            } else {
              _tmp_1 = _cursor.getString(_cursorIndexOfLabels);
            }
            _tmpLabels = StringListConverter.fromDb(_tmp_1);
            _item = new MailEntity(_tmpId,_tmpSubject,_tmpBody,_tmpDate,_tmpRead,_tmpFromName,_tmpFromEmail,_tmpLabels);
            final int _tmp_2;
            _tmp_2 = _cursor.getInt(_cursorIndexOfTrashed);
            _item.trashed = _tmp_2 != 0;
            _result.add(_item);
          }
          return _result;
        } finally {
          _cursor.close();
        }
      }

      @Override
      protected void finalize() {
        _statement.release();
      }
    });
  }

  @Override
  public LiveData<MailEntity> observeById(final String id) {
    final String _sql = "SELECT * FROM mails WHERE id=? LIMIT 1";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    if (id == null) {
      _statement.bindNull(_argIndex);
    } else {
      _statement.bindString(_argIndex, id);
    }
    return __db.getInvalidationTracker().createLiveData(new String[] {"mails"}, false, new Callable<MailEntity>() {
      @Override
      @Nullable
      public MailEntity call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
          final int _cursorIndexOfSubject = CursorUtil.getColumnIndexOrThrow(_cursor, "subject");
          final int _cursorIndexOfBody = CursorUtil.getColumnIndexOrThrow(_cursor, "body");
          final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
          final int _cursorIndexOfRead = CursorUtil.getColumnIndexOrThrow(_cursor, "read");
          final int _cursorIndexOfFromName = CursorUtil.getColumnIndexOrThrow(_cursor, "fromName");
          final int _cursorIndexOfFromEmail = CursorUtil.getColumnIndexOrThrow(_cursor, "fromEmail");
          final int _cursorIndexOfTrashed = CursorUtil.getColumnIndexOrThrow(_cursor, "trashed");
          final int _cursorIndexOfLabels = CursorUtil.getColumnIndexOrThrow(_cursor, "labels");
          final MailEntity _result;
          if (_cursor.moveToFirst()) {
            final String _tmpId;
            if (_cursor.isNull(_cursorIndexOfId)) {
              _tmpId = null;
            } else {
              _tmpId = _cursor.getString(_cursorIndexOfId);
            }
            final String _tmpSubject;
            if (_cursor.isNull(_cursorIndexOfSubject)) {
              _tmpSubject = null;
            } else {
              _tmpSubject = _cursor.getString(_cursorIndexOfSubject);
            }
            final String _tmpBody;
            if (_cursor.isNull(_cursorIndexOfBody)) {
              _tmpBody = null;
            } else {
              _tmpBody = _cursor.getString(_cursorIndexOfBody);
            }
            final String _tmpDate;
            if (_cursor.isNull(_cursorIndexOfDate)) {
              _tmpDate = null;
            } else {
              _tmpDate = _cursor.getString(_cursorIndexOfDate);
            }
            final boolean _tmpRead;
            final int _tmp;
            _tmp = _cursor.getInt(_cursorIndexOfRead);
            _tmpRead = _tmp != 0;
            final String _tmpFromName;
            if (_cursor.isNull(_cursorIndexOfFromName)) {
              _tmpFromName = null;
            } else {
              _tmpFromName = _cursor.getString(_cursorIndexOfFromName);
            }
            final String _tmpFromEmail;
            if (_cursor.isNull(_cursorIndexOfFromEmail)) {
              _tmpFromEmail = null;
            } else {
              _tmpFromEmail = _cursor.getString(_cursorIndexOfFromEmail);
            }
            final List<String> _tmpLabels;
            final String _tmp_1;
            if (_cursor.isNull(_cursorIndexOfLabels)) {
              _tmp_1 = null;
            } else {
              _tmp_1 = _cursor.getString(_cursorIndexOfLabels);
            }
            _tmpLabels = StringListConverter.fromDb(_tmp_1);
            _result = new MailEntity(_tmpId,_tmpSubject,_tmpBody,_tmpDate,_tmpRead,_tmpFromName,_tmpFromEmail,_tmpLabels);
            final int _tmp_2;
            _tmp_2 = _cursor.getInt(_cursorIndexOfTrashed);
            _result.trashed = _tmp_2 != 0;
          } else {
            _result = null;
          }
          return _result;
        } finally {
          _cursor.close();
        }
      }

      @Override
      protected void finalize() {
        _statement.release();
      }
    });
  }

  @Override
  public LiveData<List<MailEntity>> observeByLabel(final String label) {
    final String _sql = "SELECT * FROM mails WHERE trashed = 0 AND labels LIKE '%' || ? || '%' ORDER BY date DESC";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    if (label == null) {
      _statement.bindNull(_argIndex);
    } else {
      _statement.bindString(_argIndex, label);
    }
    return __db.getInvalidationTracker().createLiveData(new String[] {"mails"}, false, new Callable<List<MailEntity>>() {
      @Override
      @Nullable
      public List<MailEntity> call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
          final int _cursorIndexOfSubject = CursorUtil.getColumnIndexOrThrow(_cursor, "subject");
          final int _cursorIndexOfBody = CursorUtil.getColumnIndexOrThrow(_cursor, "body");
          final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
          final int _cursorIndexOfRead = CursorUtil.getColumnIndexOrThrow(_cursor, "read");
          final int _cursorIndexOfFromName = CursorUtil.getColumnIndexOrThrow(_cursor, "fromName");
          final int _cursorIndexOfFromEmail = CursorUtil.getColumnIndexOrThrow(_cursor, "fromEmail");
          final int _cursorIndexOfTrashed = CursorUtil.getColumnIndexOrThrow(_cursor, "trashed");
          final int _cursorIndexOfLabels = CursorUtil.getColumnIndexOrThrow(_cursor, "labels");
          final List<MailEntity> _result = new ArrayList<MailEntity>(_cursor.getCount());
          while (_cursor.moveToNext()) {
            final MailEntity _item;
            final String _tmpId;
            if (_cursor.isNull(_cursorIndexOfId)) {
              _tmpId = null;
            } else {
              _tmpId = _cursor.getString(_cursorIndexOfId);
            }
            final String _tmpSubject;
            if (_cursor.isNull(_cursorIndexOfSubject)) {
              _tmpSubject = null;
            } else {
              _tmpSubject = _cursor.getString(_cursorIndexOfSubject);
            }
            final String _tmpBody;
            if (_cursor.isNull(_cursorIndexOfBody)) {
              _tmpBody = null;
            } else {
              _tmpBody = _cursor.getString(_cursorIndexOfBody);
            }
            final String _tmpDate;
            if (_cursor.isNull(_cursorIndexOfDate)) {
              _tmpDate = null;
            } else {
              _tmpDate = _cursor.getString(_cursorIndexOfDate);
            }
            final boolean _tmpRead;
            final int _tmp;
            _tmp = _cursor.getInt(_cursorIndexOfRead);
            _tmpRead = _tmp != 0;
            final String _tmpFromName;
            if (_cursor.isNull(_cursorIndexOfFromName)) {
              _tmpFromName = null;
            } else {
              _tmpFromName = _cursor.getString(_cursorIndexOfFromName);
            }
            final String _tmpFromEmail;
            if (_cursor.isNull(_cursorIndexOfFromEmail)) {
              _tmpFromEmail = null;
            } else {
              _tmpFromEmail = _cursor.getString(_cursorIndexOfFromEmail);
            }
            final List<String> _tmpLabels;
            final String _tmp_1;
            if (_cursor.isNull(_cursorIndexOfLabels)) {
              _tmp_1 = null;
            } else {
              _tmp_1 = _cursor.getString(_cursorIndexOfLabels);
            }
            _tmpLabels = StringListConverter.fromDb(_tmp_1);
            _item = new MailEntity(_tmpId,_tmpSubject,_tmpBody,_tmpDate,_tmpRead,_tmpFromName,_tmpFromEmail,_tmpLabels);
            final int _tmp_2;
            _tmp_2 = _cursor.getInt(_cursorIndexOfTrashed);
            _item.trashed = _tmp_2 != 0;
            _result.add(_item);
          }
          return _result;
        } finally {
          _cursor.close();
        }
      }

      @Override
      protected void finalize() {
        _statement.release();
      }
    });
  }

  @Override
  public LiveData<List<MailEntity>> observeTrash() {
    final String _sql = "SELECT * FROM mails WHERE trashed = 1 ORDER BY date DESC";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    return __db.getInvalidationTracker().createLiveData(new String[] {"mails"}, false, new Callable<List<MailEntity>>() {
      @Override
      @Nullable
      public List<MailEntity> call() throws Exception {
        final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
        try {
          final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
          final int _cursorIndexOfSubject = CursorUtil.getColumnIndexOrThrow(_cursor, "subject");
          final int _cursorIndexOfBody = CursorUtil.getColumnIndexOrThrow(_cursor, "body");
          final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
          final int _cursorIndexOfRead = CursorUtil.getColumnIndexOrThrow(_cursor, "read");
          final int _cursorIndexOfFromName = CursorUtil.getColumnIndexOrThrow(_cursor, "fromName");
          final int _cursorIndexOfFromEmail = CursorUtil.getColumnIndexOrThrow(_cursor, "fromEmail");
          final int _cursorIndexOfTrashed = CursorUtil.getColumnIndexOrThrow(_cursor, "trashed");
          final int _cursorIndexOfLabels = CursorUtil.getColumnIndexOrThrow(_cursor, "labels");
          final List<MailEntity> _result = new ArrayList<MailEntity>(_cursor.getCount());
          while (_cursor.moveToNext()) {
            final MailEntity _item;
            final String _tmpId;
            if (_cursor.isNull(_cursorIndexOfId)) {
              _tmpId = null;
            } else {
              _tmpId = _cursor.getString(_cursorIndexOfId);
            }
            final String _tmpSubject;
            if (_cursor.isNull(_cursorIndexOfSubject)) {
              _tmpSubject = null;
            } else {
              _tmpSubject = _cursor.getString(_cursorIndexOfSubject);
            }
            final String _tmpBody;
            if (_cursor.isNull(_cursorIndexOfBody)) {
              _tmpBody = null;
            } else {
              _tmpBody = _cursor.getString(_cursorIndexOfBody);
            }
            final String _tmpDate;
            if (_cursor.isNull(_cursorIndexOfDate)) {
              _tmpDate = null;
            } else {
              _tmpDate = _cursor.getString(_cursorIndexOfDate);
            }
            final boolean _tmpRead;
            final int _tmp;
            _tmp = _cursor.getInt(_cursorIndexOfRead);
            _tmpRead = _tmp != 0;
            final String _tmpFromName;
            if (_cursor.isNull(_cursorIndexOfFromName)) {
              _tmpFromName = null;
            } else {
              _tmpFromName = _cursor.getString(_cursorIndexOfFromName);
            }
            final String _tmpFromEmail;
            if (_cursor.isNull(_cursorIndexOfFromEmail)) {
              _tmpFromEmail = null;
            } else {
              _tmpFromEmail = _cursor.getString(_cursorIndexOfFromEmail);
            }
            final List<String> _tmpLabels;
            final String _tmp_1;
            if (_cursor.isNull(_cursorIndexOfLabels)) {
              _tmp_1 = null;
            } else {
              _tmp_1 = _cursor.getString(_cursorIndexOfLabels);
            }
            _tmpLabels = StringListConverter.fromDb(_tmp_1);
            _item = new MailEntity(_tmpId,_tmpSubject,_tmpBody,_tmpDate,_tmpRead,_tmpFromName,_tmpFromEmail,_tmpLabels);
            final int _tmp_2;
            _tmp_2 = _cursor.getInt(_cursorIndexOfTrashed);
            _item.trashed = _tmp_2 != 0;
            _result.add(_item);
          }
          return _result;
        } finally {
          _cursor.close();
        }
      }

      @Override
      protected void finalize() {
        _statement.release();
      }
    });
  }

  @Override
  public List<MailEntity> getByLabel(final String label) {
    final String _sql = "SELECT * FROM mails WHERE labels LIKE '%' || ? || '%' ORDER BY date DESC";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    if (label == null) {
      _statement.bindNull(_argIndex);
    } else {
      _statement.bindString(_argIndex, label);
    }
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfSubject = CursorUtil.getColumnIndexOrThrow(_cursor, "subject");
      final int _cursorIndexOfBody = CursorUtil.getColumnIndexOrThrow(_cursor, "body");
      final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
      final int _cursorIndexOfRead = CursorUtil.getColumnIndexOrThrow(_cursor, "read");
      final int _cursorIndexOfFromName = CursorUtil.getColumnIndexOrThrow(_cursor, "fromName");
      final int _cursorIndexOfFromEmail = CursorUtil.getColumnIndexOrThrow(_cursor, "fromEmail");
      final int _cursorIndexOfTrashed = CursorUtil.getColumnIndexOrThrow(_cursor, "trashed");
      final int _cursorIndexOfLabels = CursorUtil.getColumnIndexOrThrow(_cursor, "labels");
      final List<MailEntity> _result = new ArrayList<MailEntity>(_cursor.getCount());
      while (_cursor.moveToNext()) {
        final MailEntity _item;
        final String _tmpId;
        if (_cursor.isNull(_cursorIndexOfId)) {
          _tmpId = null;
        } else {
          _tmpId = _cursor.getString(_cursorIndexOfId);
        }
        final String _tmpSubject;
        if (_cursor.isNull(_cursorIndexOfSubject)) {
          _tmpSubject = null;
        } else {
          _tmpSubject = _cursor.getString(_cursorIndexOfSubject);
        }
        final String _tmpBody;
        if (_cursor.isNull(_cursorIndexOfBody)) {
          _tmpBody = null;
        } else {
          _tmpBody = _cursor.getString(_cursorIndexOfBody);
        }
        final String _tmpDate;
        if (_cursor.isNull(_cursorIndexOfDate)) {
          _tmpDate = null;
        } else {
          _tmpDate = _cursor.getString(_cursorIndexOfDate);
        }
        final boolean _tmpRead;
        final int _tmp;
        _tmp = _cursor.getInt(_cursorIndexOfRead);
        _tmpRead = _tmp != 0;
        final String _tmpFromName;
        if (_cursor.isNull(_cursorIndexOfFromName)) {
          _tmpFromName = null;
        } else {
          _tmpFromName = _cursor.getString(_cursorIndexOfFromName);
        }
        final String _tmpFromEmail;
        if (_cursor.isNull(_cursorIndexOfFromEmail)) {
          _tmpFromEmail = null;
        } else {
          _tmpFromEmail = _cursor.getString(_cursorIndexOfFromEmail);
        }
        final List<String> _tmpLabels;
        final String _tmp_1;
        if (_cursor.isNull(_cursorIndexOfLabels)) {
          _tmp_1 = null;
        } else {
          _tmp_1 = _cursor.getString(_cursorIndexOfLabels);
        }
        _tmpLabels = StringListConverter.fromDb(_tmp_1);
        _item = new MailEntity(_tmpId,_tmpSubject,_tmpBody,_tmpDate,_tmpRead,_tmpFromName,_tmpFromEmail,_tmpLabels);
        final int _tmp_2;
        _tmp_2 = _cursor.getInt(_cursorIndexOfTrashed);
        _item.trashed = _tmp_2 != 0;
        _result.add(_item);
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public MailEntity getByIdNow(final String id) {
    final String _sql = "SELECT * FROM mails WHERE id=? LIMIT 1";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    if (id == null) {
      _statement.bindNull(_argIndex);
    } else {
      _statement.bindString(_argIndex, id);
    }
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "id");
      final int _cursorIndexOfSubject = CursorUtil.getColumnIndexOrThrow(_cursor, "subject");
      final int _cursorIndexOfBody = CursorUtil.getColumnIndexOrThrow(_cursor, "body");
      final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
      final int _cursorIndexOfRead = CursorUtil.getColumnIndexOrThrow(_cursor, "read");
      final int _cursorIndexOfFromName = CursorUtil.getColumnIndexOrThrow(_cursor, "fromName");
      final int _cursorIndexOfFromEmail = CursorUtil.getColumnIndexOrThrow(_cursor, "fromEmail");
      final int _cursorIndexOfTrashed = CursorUtil.getColumnIndexOrThrow(_cursor, "trashed");
      final int _cursorIndexOfLabels = CursorUtil.getColumnIndexOrThrow(_cursor, "labels");
      final MailEntity _result;
      if (_cursor.moveToFirst()) {
        final String _tmpId;
        if (_cursor.isNull(_cursorIndexOfId)) {
          _tmpId = null;
        } else {
          _tmpId = _cursor.getString(_cursorIndexOfId);
        }
        final String _tmpSubject;
        if (_cursor.isNull(_cursorIndexOfSubject)) {
          _tmpSubject = null;
        } else {
          _tmpSubject = _cursor.getString(_cursorIndexOfSubject);
        }
        final String _tmpBody;
        if (_cursor.isNull(_cursorIndexOfBody)) {
          _tmpBody = null;
        } else {
          _tmpBody = _cursor.getString(_cursorIndexOfBody);
        }
        final String _tmpDate;
        if (_cursor.isNull(_cursorIndexOfDate)) {
          _tmpDate = null;
        } else {
          _tmpDate = _cursor.getString(_cursorIndexOfDate);
        }
        final boolean _tmpRead;
        final int _tmp;
        _tmp = _cursor.getInt(_cursorIndexOfRead);
        _tmpRead = _tmp != 0;
        final String _tmpFromName;
        if (_cursor.isNull(_cursorIndexOfFromName)) {
          _tmpFromName = null;
        } else {
          _tmpFromName = _cursor.getString(_cursorIndexOfFromName);
        }
        final String _tmpFromEmail;
        if (_cursor.isNull(_cursorIndexOfFromEmail)) {
          _tmpFromEmail = null;
        } else {
          _tmpFromEmail = _cursor.getString(_cursorIndexOfFromEmail);
        }
        final List<String> _tmpLabels;
        final String _tmp_1;
        if (_cursor.isNull(_cursorIndexOfLabels)) {
          _tmp_1 = null;
        } else {
          _tmp_1 = _cursor.getString(_cursorIndexOfLabels);
        }
        _tmpLabels = StringListConverter.fromDb(_tmp_1);
        _result = new MailEntity(_tmpId,_tmpSubject,_tmpBody,_tmpDate,_tmpRead,_tmpFromName,_tmpFromEmail,_tmpLabels);
        final int _tmp_2;
        _tmp_2 = _cursor.getInt(_cursorIndexOfTrashed);
        _result.trashed = _tmp_2 != 0;
      } else {
        _result = null;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @NonNull
  public static List<Class<?>> getRequiredConverters() {
    return Collections.emptyList();
  }
}
